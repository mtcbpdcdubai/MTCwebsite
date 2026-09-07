-- ============================================================================
-- MTC Points & Leaderboard System — Phase 1: core schema
--
-- Source of truth principle: point_transactions is an append-only ledger.
-- Member totals and leaderboard rank are ALWAYS derived (views), never a
-- stored column, so there is no place for a total to drift out of sync.
-- ============================================================================

create extension if not exists pgcrypto; -- gen_random_uuid()

-- ----------------------------------------------------------------------------
-- Enums
-- ----------------------------------------------------------------------------
create type transaction_source as enum ('EVENT', 'REFERRAL', 'MANUAL_ADJUSTMENT');
create type referral_status as enum ('Pending', 'Completed', 'Rejected');

-- ----------------------------------------------------------------------------
-- members
-- ----------------------------------------------------------------------------
create table members (
  id uuid primary key default gen_random_uuid(),
  bits_id text not null unique,
  name text not null,
  email text not null,
  auth_user_id uuid unique references auth.users(id), -- nullable; reserved for future member self-service login
  referral_code text not null unique,
  created_at timestamptz not null default now()
);

comment on table members is 'MTC members keyed by BITS ID. Total points are derived from point_transactions — never stored here.';

-- NOTE: intentionally permissive placeholder format check (uppercase
-- alphanumeric, 8-15 chars) until the real BITS ID format is confirmed.
-- Tighten this once confirmed rather than guessing a stricter pattern that
-- could wrongly reject real students.
alter table members add constraint members_bits_id_format
  check (bits_id ~ '^[A-Z0-9]{8,15}$');

create index members_bits_id_idx on members (bits_id);
create index members_referral_code_idx on members (referral_code);

-- ----------------------------------------------------------------------------
-- admins (the allowlist — no public write path; seeded manually via SQL editor)
-- ----------------------------------------------------------------------------
create table admins (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id),
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

comment on table admins is 'Admin allowlist. Rows are only ever inserted manually (SQL editor / service role) after inviting the user via Supabase Auth — there is no in-app self-promotion path.';

-- ----------------------------------------------------------------------------
-- settings (small key/value config — rewards_top_n, current_academic_year)
-- ----------------------------------------------------------------------------
create table settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references admins(id)
);

insert into settings (key, value) values
  ('rewards_top_n', '10'),
  ('current_academic_year', '"AY2026"');

create or replace function current_academic_year() returns text
language sql stable as $$
  select value #>> '{}' from settings where key = 'current_academic_year';
$$;

-- ----------------------------------------------------------------------------
-- referral code generation + members normalization trigger
-- ----------------------------------------------------------------------------
create or replace function generate_unique_referral_code() returns text
language plpgsql as $$
declare
  candidate text;
  tries int := 0;
begin
  loop
    candidate := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
    exit when not exists (select 1 from members where referral_code = candidate);
    tries := tries + 1;
    if tries > 20 then
      raise exception 'could not generate a unique referral code after % tries', tries;
    end if;
  end loop;
  return candidate;
end;
$$;

create or replace function members_before_insert() returns trigger
language plpgsql as $$
begin
  new.bits_id := upper(trim(new.bits_id));
  new.email := lower(trim(new.email));
  if new.referral_code is null then
    new.referral_code := generate_unique_referral_code();
  end if;
  return new;
end;
$$;

create trigger trg_members_before_insert
  before insert on members
  for each row execute function members_before_insert();

-- ----------------------------------------------------------------------------
-- import_batches (CSV upload run metadata — backs the admin import-history view)
-- ----------------------------------------------------------------------------
create table import_batches (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  academic_year text not null default current_academic_year(),
  uploaded_by uuid not null references admins(id),
  original_filename text,
  status text not null default 'pending' check (status in ('pending', 'committed', 'failed')),
  total_rows int not null default 0,
  succeeded_rows int not null default 0,
  failed_rows int not null default 0,
  points_awarded int not null default 0,
  created_at timestamptz not null default now(),
  committed_at timestamptz
);

-- ----------------------------------------------------------------------------
-- referrals
-- ----------------------------------------------------------------------------
create table referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references members(id),
  new_member_id uuid not null unique references members(id), -- UNIQUE is the DB-level "one referral per new member, immutable" rule
  referral_code_used text not null,
  status referral_status not null default 'Pending',
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  constraint no_self_referral check (referrer_id <> new_member_id)
);

comment on table referrals is 'A referral only ever exists as Completed for the MVP — completion happens atomically inside register_member(), never as a later status flip from a lingering Pending row.';

-- ----------------------------------------------------------------------------
-- point_transactions (the ledger — single source of truth)
-- ----------------------------------------------------------------------------
create table point_transactions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  points int not null, -- may be negative, e.g. MANUAL_ADJUSTMENT corrections
  source transaction_source not null,
  academic_year text not null default current_academic_year(),

  -- EVENT-sourced fields
  event_name text,
  achievement text check (achievement is null or achievement in ('PARTICIPANT', 'FIRST', 'SECOND', 'THIRD', 'SPECIAL')),
  import_batch_id uuid references import_batches(id),

  -- REFERRAL-sourced fields
  referral_id uuid references referrals(id),

  -- MANUAL_ADJUSTMENT-sourced fields
  reason text,
  created_by_admin uuid references admins(id),

  created_at timestamptz not null default now(),

  constraint event_fields_required check (
    source <> 'EVENT' or (event_name is not null and achievement is not null and import_batch_id is not null)
  ),
  constraint referral_fields_required check (
    source <> 'REFERRAL' or referral_id is not null
  ),
  constraint manual_fields_required check (
    source <> 'MANUAL_ADJUSTMENT' or (reason is not null and created_by_admin is not null)
  )
);

comment on table point_transactions is 'Append-only ledger. Never update or delete rows in application code — corrections are new MANUAL_ADJUSTMENT rows.';

-- THE idempotency constraint: makes CSV re-imports and intra-file duplicate
-- rows a no-op (via `insert ... on conflict do nothing`) instead of a
-- double-award, enforced by Postgres itself, not application logic.
create unique index point_transactions_event_uniqueness
  on point_transactions (member_id, event_name, achievement)
  where source = 'EVENT';

-- Guarantees a completed referral can never pay out twice, on either side.
create unique index point_transactions_referral_uniqueness
  on point_transactions (referral_id, member_id)
  where source = 'REFERRAL';

create index point_transactions_member_id_idx on point_transactions (member_id);

-- ----------------------------------------------------------------------------
-- email_log (backs "email status" on CSV summaries / import history)
-- ----------------------------------------------------------------------------
create table email_log (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id),
  import_batch_id uuid references import_batches(id),
  referral_id uuid references referrals(id),
  template text not null check (template in ('PARTICIPANT', 'WINNER', 'SPECIAL_AWARD', 'REFERRAL_REFERRER', 'REFERRAL_NEW_MEMBER')),
  status text not null check (status in ('sent', 'failed')),
  error text,
  sent_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Derived views — totals and rank are ALWAYS computed here, never stored.
-- ----------------------------------------------------------------------------
create view member_totals as
  select
    m.id as member_id,
    m.name,
    coalesce(sum(t.points), 0)::int as total_points,
    min(t.created_at) filter (where t.points > 0) as first_scored_at
  from members m
  left join point_transactions t
    on t.member_id = m.id
    and t.academic_year = current_academic_year()
  group by m.id, m.name;

comment on view member_totals is 'No bits_id/email columns by design — this is what the public leaderboard and rank computation read from.';

create view leaderboard as
  select
    member_id,
    name,
    total_points,
    rank() over (order by total_points desc, first_scored_at asc nulls last) as rank
  from member_totals;

comment on view leaderboard is 'Standard competition ranking (ties share a rank, e.g. 1,2,2,4). Tie-break is earliest first positive-points transaction, for stable display order only — it does not create an artificial rank gap.';

-- ----------------------------------------------------------------------------
-- is_admin(): SECURITY DEFINER so it bypasses RLS internally. This avoids the
-- classic self-referencing-RLS recursion problem on the admins table itself,
-- and is the single check every admin-gated RLS policy below reuses.
-- ----------------------------------------------------------------------------
create or replace function is_admin() returns boolean
language sql security definer stable as $$
  select exists (select 1 from admins where auth_user_id = auth.uid());
$$;

grant execute on function is_admin() to anon, authenticated;

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------
alter table members enable row level security;
alter table admins enable row level security;
alter table settings enable row level security;
alter table import_batches enable row level security;
alter table referrals enable row level security;
alter table point_transactions enable row level security;
alter table email_log enable row level security;

create policy admins_select_admin_only on admins for select using (is_admin());

create policy members_select_admin_only on members for select using (is_admin());
create policy members_admin_insert on members for insert with check (is_admin());
create policy members_admin_update on members for update using (is_admin());
-- Note: register_member() (Phase 5) inserts into members via SECURITY DEFINER,
-- bypassing RLS entirely, which is by design — the insert policy above only
-- matters for an admin editing a record directly from the dashboard UI.

create policy import_batches_admin_all on import_batches for all
  using (is_admin()) with check (is_admin());

create policy referrals_select_admin_only on referrals for select using (is_admin());
create policy referrals_admin_update on referrals for update
  using (is_admin()) with check (is_admin());

create policy point_transactions_select_admin_only on point_transactions for select using (is_admin());
-- Deliberately NO insert/update/delete policy for authenticated/anon at all.
-- The only way rows are created is via SECURITY DEFINER functions running as
-- the table owner, bypassing RLS by design. This physically prevents any
-- client — including a compromised admin browser session — from inserting a
-- raw point_transactions row that skips point-calculation/idempotency logic.

create policy email_log_admin_select on email_log for select using (is_admin());

create policy settings_select_public on settings for select using (true);
create policy settings_admin_write on settings for update using (is_admin());

-- Public, PII-free reads: no auth required.
grant select on leaderboard to anon, authenticated;
grant select on member_totals to anon, authenticated;
grant select on settings to anon, authenticated;
