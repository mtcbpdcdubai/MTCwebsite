-- ============================================================================
-- Close a real gap found in review: neither register_member() nor
-- referral_code_is_valid() ever checked that the REFERRER's own membership
-- was ACTIVE -- only that the code matched a row in members. Live test just
-- confirmed this: a brand-new member whose own membership was still PENDING
-- (never paid) had their referral code accepted for a second registration,
-- and admin_activate_membership() would pay that unpaid referrer their +2
-- the moment the second person's payment gets confirmed -- regardless of
-- whether the referrer themselves ever pays a cent.
--
-- Fix: a referral code only resolves to a referrer if that referrer
-- currently has an ACTIVE membership_periods row. This is checked at
-- redemption time (registration), not at payout time, so an unpaid/expired
-- member's code is simply rejected up front -- register_member() raises the
-- same invalid_referral_code error a typo would.
-- ============================================================================

create or replace function referral_code_is_valid(p_code text) returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from members m
    join membership_periods mp on mp.member_id = m.id
    where m.referral_code = upper(trim(p_code))
      and mp.status = 'ACTIVE'
  );
$$;

grant execute on function referral_code_is_valid(text) to anon, authenticated;

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
    select m.id, m.name into v_referrer_id, v_referrer_name
    from members m
    join membership_periods mp on mp.member_id = m.id
    where m.referral_code = upper(trim(p_referral_code))
      and mp.status = 'ACTIVE';

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
