-- ============================================================================
-- Change referral bonus from +3/+3 to +2/+2 (referrer and new member both).
-- Only the point values change -- registration/referral logic is untouched.
-- ============================================================================

create or replace function register_member(
  p_bits_id text,
  p_name text,
  p_email text,
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

  insert into members (bits_id, name, email)
  values (v_bits_id, p_name, p_email)
  returning id, referral_code into v_new_member_id, v_referral_code;

  if v_referrer_id is not null then
    insert into referrals (referrer_id, new_member_id, referral_code_used, status, completed_at)
    values (v_referrer_id, v_new_member_id, upper(trim(p_referral_code)), 'Completed', now())
    returning id into v_referral_id;

    insert into point_transactions (member_id, points, source, referral_id)
    values (v_referrer_id, 2, 'REFERRAL', v_referral_id);

    insert into point_transactions (member_id, points, source, referral_id)
    values (v_new_member_id, 2, 'REFERRAL', v_referral_id);
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

grant execute on function register_member(text, text, text, text) to anon, authenticated;
