-- ============================================================================
-- Gate membership activation on payment confirmation.
--
-- MTC's payment collection is external (cash / bank transfer) -- the site
-- never processes it. Until now /join activated a membership immediately on
-- submission, which meant anyone could "register" without ever paying and
-- still walk away with (eventually) a live membership and a paid-out
-- referral bonus for themselves and a friend. This closes that gap:
-- registering now only creates a PENDING membership period and a Pending
-- referral. An admin confirms payment via the dashboard -- THAT action is
-- what activates the membership and is the only place referral points are
-- ever paid out.
--
-- This only applies to the public /join path. Admin-initiated renewals
-- (admin_start_membership_period) go straight to ACTIVE, same as before --
-- an admin only clicks that after already seeing proof of payment, so there
-- is no unverified state to gate there.
-- ============================================================================

alter type membership_status add value if not exists 'PENDING';

alter table membership_periods add column if not exists activated_at timestamptz;
alter table membership_periods add column if not exists activated_by_admin uuid references admins(id);

create or replace function register_member(
  p_bits_id text,
  p_name text,
  p_email text,
  p_membership_type membership_type,
  p_whatsapp_number text,
  p_referral_code text default null
) returns jsonb
language plpgsql
security definer
as $$
declare
  v_bits_id text := upper(trim(p_bits_id));
  v_new_member_id uuid;
  v_referrer_id uuid;
  v_referrer_name text;
  v_referral_id uuid;
  v_referral_code text;
begin
  if v_bits_id !~ '^[A-Z0-9]{8,15}$' then
    raise exception 'invalid_bits_id';
  end if;

  if trim(coalesce(p_name, '')) = '' then
    raise exception 'invalid_name';
  end if;

  if trim(coalesce(p_email, '')) = '' then
    raise exception 'invalid_email';
  end if;

  if trim(coalesce(p_whatsapp_number, '')) = '' then
    raise exception 'invalid_whatsapp_number';
  end if;

  if exists (select 1 from members where bits_id = v_bits_id) then
    raise exception 'already_registered';
  end if;

  if p_referral_code is not null and trim(p_referral_code) <> '' then
    select id, name into v_referrer_id, v_referrer_name
    from members
    where referral_code = upper(trim(p_referral_code));

    if v_referrer_id is null then
      raise exception 'invalid_referral_code';
    end if;
  end if;

  insert into members (bits_id, name, email, whatsapp_number)
  values (v_bits_id, p_name, p_email, trim(p_whatsapp_number))
  returning id, referral_code into v_new_member_id, v_referral_code;

  insert into membership_periods (member_id, membership_type, period_label, status)
  values (
    v_new_member_id,
    p_membership_type,
    (select value #>> '{}' from settings where key = 'current_period_label'),
    'PENDING'
  );

  -- Recorded, not paid out: no point_transactions are inserted here. The
  -- referral only pays out when admin_activate_membership() confirms this
  -- member's own payment -- see below.
  if v_referrer_id is not null then
    insert into referrals (referrer_id, new_member_id, referral_code_used, status)
    values (v_referrer_id, v_new_member_id, upper(trim(p_referral_code)), 'Pending')
    returning id into v_referral_id;
  end if;

  return jsonb_build_object(
    'member_id', v_new_member_id,
    'name', p_name,
    'bits_id', v_bits_id,
    'referral_code', v_referral_code,
    'referral_applied', v_referrer_id is not null,
    'referrer_id', v_referrer_id,
    'referrer_name', v_referrer_name
  );
end;
$$;

grant execute on function register_member(text, text, text, membership_type, text, text) to anon, authenticated;

-- ----------------------------------------------------------------------------
-- admin_activate_membership(): the only place a PENDING period becomes
-- ACTIVE, and the only place referral points get created. Idempotent via
-- the existing point_transactions_referral_uniqueness partial index -- if
-- this is ever somehow called twice for the same referral, the second
-- insert is a silent no-op, not a double payout.
-- ----------------------------------------------------------------------------
create or replace function admin_activate_membership(p_membership_period_id uuid) returns jsonb
language plpgsql
security definer
as $$
declare
  v_admin_id uuid;
  v_member_id uuid;
  v_status membership_status;
  v_referral_id uuid;
  v_referrer_id uuid;
begin
  if not is_admin() then
    raise exception 'not_authorized';
  end if;

  select member_id, status into v_member_id, v_status
  from membership_periods where id = p_membership_period_id;

  if v_member_id is null then
    raise exception 'not_found';
  end if;

  if v_status <> 'PENDING' then
    raise exception 'not_pending';
  end if;

  select id into v_admin_id from admins where auth_user_id = auth.uid();

  update membership_periods
  set status = 'ACTIVE', activated_at = now(), activated_by_admin = v_admin_id
  where id = p_membership_period_id;

  select id, referrer_id into v_referral_id, v_referrer_id
  from referrals where new_member_id = v_member_id and status = 'Pending';

  if v_referral_id is not null then
    update referrals set status = 'Completed', completed_at = now() where id = v_referral_id;

    insert into point_transactions (member_id, points, source, referral_id)
    values (v_referrer_id, 2, 'REFERRAL', v_referral_id)
    on conflict (referral_id, member_id) where source = 'REFERRAL' do nothing;

    insert into point_transactions (member_id, points, source, referral_id)
    values (v_member_id, 2, 'REFERRAL', v_referral_id)
    on conflict (referral_id, member_id) where source = 'REFERRAL' do nothing;
  end if;

  return jsonb_build_object(
    'member_id', v_member_id,
    'referral_completed', v_referral_id is not null,
    'referrer_id', v_referrer_id,
    'referral_id', v_referral_id
  );
end;
$$;

grant execute on function admin_activate_membership(uuid) to authenticated;

-- admin_reject_membership(): declines a pending registration that never
-- paid. The period is marked EXPIRED (it was never active) and any tied
-- referral Rejected -- no points are ever created for it.
create or replace function admin_reject_membership(p_membership_period_id uuid) returns void
language plpgsql
security definer
as $$
declare
  v_member_id uuid;
  v_status membership_status;
  v_admin_id uuid;
begin
  if not is_admin() then
    raise exception 'not_authorized';
  end if;

  select member_id, status into v_member_id, v_status
  from membership_periods where id = p_membership_period_id;

  if v_member_id is null then
    raise exception 'not_found';
  end if;

  if v_status <> 'PENDING' then
    raise exception 'not_pending';
  end if;

  select id into v_admin_id from admins where auth_user_id = auth.uid();

  update membership_periods
  set status = 'EXPIRED', expired_at = now(), expired_by_admin = v_admin_id
  where id = p_membership_period_id;

  update referrals set status = 'Rejected'
  where new_member_id = v_member_id and status = 'Pending';
end;
$$;

grant execute on function admin_reject_membership(uuid) to authenticated;
