-- ============================================================================
-- Membership type (Lifetime / Semester) + expiration tracking.
--
-- Same ledger pattern as point_transactions: membership_periods is
-- append-only history, one row per (member, period). "Current status" is
-- always derived (member_membership_status view), never a mutable column on
-- members — mirrors how member_totals/leaderboard derive from
-- point_transactions instead of storing a total.
--
-- The core anti-fraud property this closes: register_member() already
-- rejects any bits_id that exists in `members`, and that check is NOT scoped
-- to any period or academic year, so a lapsed-then-returning member can
-- never re-run register_member() and can never re-earn a referral bonus.
-- This migration only adds the missing piece -- recording membership
-- type/active-expired status -- it does not touch that guarantee.
-- ============================================================================

create type membership_type as enum ('LIFETIME', 'SEMESTER');
create type membership_status as enum ('ACTIVE', 'EXPIRED');

create table membership_periods (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  membership_type membership_type not null,
  period_label text not null,
  status membership_status not null default 'ACTIVE',
  started_at timestamptz not null default now(),
  expired_at timestamptz,
  expired_by_admin uuid references admins(id),
  created_at timestamptz not null default now()
);

comment on table membership_periods is 'Append-only membership history, one row per period per member. Never update a row except to flip status to EXPIRED -- a renewal after a lapse is a brand new row, not a resurrection of the old one.';

-- A member can have many periods over time, but only one ACTIVE at once.
-- This is also what makes admin_start_membership_period's "expire the old
-- one first" step required rather than optional -- the DB rejects a second
-- concurrent ACTIVE row outright.
create unique index membership_periods_one_active_per_member
  on membership_periods (member_id) where status = 'ACTIVE';

create index membership_periods_member_id_idx on membership_periods (member_id);

create view member_membership_status as
  select distinct on (member_id)
    id, member_id, membership_type, status, period_label, started_at, expired_at
  from membership_periods
  order by member_id, started_at desc;

comment on view member_membership_status is 'Latest membership_periods row per member -- derived, same principle as member_totals. No PII columns, safe for public grant.';

alter table membership_periods enable row level security;

create policy membership_periods_select_admin_only on membership_periods for select using (is_admin());
-- Deliberately no insert/update/delete policy for anon/authenticated -- same
-- as point_transactions: rows only ever change via the SECURITY DEFINER
-- RPCs below (and register_member()), bypassing RLS by design.

grant select on member_membership_status to anon, authenticated;

insert into settings (key, value) values
  ('current_period_label', '"AY2026 Sem 1"');

-- ----------------------------------------------------------------------------
-- Backfill: every existing member gets one ACTIVE/SEMESTER row at the
-- current period. This is a safe default, not a claim about reality --
-- admins should do a one-time pass in the dashboard to flag actual lifetime
-- members as LIFETIME.
-- ----------------------------------------------------------------------------
insert into membership_periods (member_id, membership_type, period_label, status)
select id, 'SEMESTER', (select value #>> '{}' from settings where key = 'current_period_label'), 'ACTIVE'
from members;

-- ----------------------------------------------------------------------------
-- register_member(): now also opens the member's first membership period.
-- Only the signature and the new insert change -- referral logic untouched.
-- ----------------------------------------------------------------------------
create or replace function register_member(
  p_bits_id text,
  p_name text,
  p_email text,
  p_membership_type membership_type,
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

  insert into membership_periods (member_id, membership_type, period_label, status)
  values (
    v_new_member_id,
    p_membership_type,
    (select value #>> '{}' from settings where key = 'current_period_label'),
    'ACTIVE'
  );

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

grant execute on function register_member(text, text, text, membership_type, text) to anon, authenticated;

-- Drop the old 4-arg signature -- register-member Edge Function is being
-- redeployed alongside this migration to always pass membership_type.
drop function if exists register_member(text, text, text, text);

-- ----------------------------------------------------------------------------
-- Admin RPCs -- same is_admin()-gated SECURITY DEFINER pattern as
-- admin_adjust_points().
-- ----------------------------------------------------------------------------
create or replace function admin_start_membership_period(
  p_member_id uuid,
  p_membership_type membership_type,
  p_period_label text default null
) returns uuid
language plpgsql
security definer
as $$
declare
  v_new_id uuid;
  v_label text := coalesce(p_period_label, (select value #>> '{}' from settings where key = 'current_period_label'));
begin
  if not is_admin() then
    raise exception 'not_authorized';
  end if;

  update membership_periods
  set status = 'EXPIRED', expired_at = now()
  where member_id = p_member_id and status = 'ACTIVE';

  insert into membership_periods (member_id, membership_type, period_label, status)
  values (p_member_id, p_membership_type, v_label, 'ACTIVE')
  returning id into v_new_id;

  return v_new_id;
end;
$$;

grant execute on function admin_start_membership_period(uuid, membership_type, text) to authenticated;

create or replace function admin_expire_membership(p_membership_period_id uuid) returns void
language plpgsql
security definer
as $$
declare
  v_status membership_status;
  v_type membership_type;
  v_admin_id uuid;
begin
  if not is_admin() then
    raise exception 'not_authorized';
  end if;

  select status, membership_type into v_status, v_type
  from membership_periods where id = p_membership_period_id;

  if v_status is null then
    raise exception 'not_found';
  end if;

  if v_status = 'EXPIRED' then
    raise exception 'already_expired';
  end if;

  if v_type = 'LIFETIME' then
    raise exception 'cannot_expire_lifetime';
  end if;

  select id into v_admin_id from admins where auth_user_id = auth.uid();

  update membership_periods
  set status = 'EXPIRED', expired_at = now(), expired_by_admin = v_admin_id
  where id = p_membership_period_id;
end;
$$;

grant execute on function admin_expire_membership(uuid) to authenticated;

create or replace function admin_bulk_expire_semester_memberships(p_period_label text default null) returns int
language plpgsql
security definer
as $$
declare
  v_admin_id uuid;
  v_count int;
begin
  if not is_admin() then
    raise exception 'not_authorized';
  end if;

  select id into v_admin_id from admins where auth_user_id = auth.uid();

  with expired as (
    update membership_periods
    set status = 'EXPIRED', expired_at = now(), expired_by_admin = v_admin_id
    where status = 'ACTIVE'
      and membership_type = 'SEMESTER'
      and (p_period_label is null or period_label = p_period_label)
    returning 1
  )
  select count(*) into v_count from expired;

  return v_count;
end;
$$;

grant execute on function admin_bulk_expire_semester_memberships(text) to authenticated;
