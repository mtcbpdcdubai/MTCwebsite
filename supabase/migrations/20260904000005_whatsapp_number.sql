-- ============================================================================
-- Add WhatsApp contact number, matching the Google Form's "WhatsApp Contact"
-- field. NOT NULL at the DB level -- the members table is empty at the time
-- of this migration, so there's no existing-row backfill to worry about.
--
-- Also simplifies import_csv_batch(): CSV/manual-entry imports are for
-- awarding points to members who already exist (via /join) -- they no
-- longer create a member on the fly for an unrecognized BITS ID. This
-- removes the only other place besides register_member() that inserted into
-- members, so there's no second path that needs to fill in whatsapp_number.
-- ============================================================================

alter table members add column if not exists whatsapp_number text;
alter table members alter column whatsapp_number set not null;

create or replace function import_csv_batch(
  p_rows jsonb,
  p_uploaded_by uuid,
  p_original_filename text default null
) returns jsonb
language plpgsql
security definer
as $$
declare
  v_batch_id uuid;
  v_event_name text;
  v_distinct_events int;
  v_row jsonb;
  v_member_id uuid;
  v_points int;
  v_tx_id uuid;
  v_results jsonb := '[]'::jsonb;
  v_total int := 0;
  v_succeeded int := 0;
  v_failed int := 0;
  v_points_awarded int := 0;
begin
  if not is_admin() then
    raise exception 'not authorized';
  end if;

  select count(distinct value ->> 'event_name') into v_distinct_events
  from jsonb_array_elements(p_rows);

  if v_distinct_events = 1 then
    select value ->> 'event_name' into v_event_name from jsonb_array_elements(p_rows) limit 1;
  else
    v_event_name := 'Multiple Events';
  end if;

  insert into import_batches (event_name, uploaded_by, original_filename, status, total_rows)
  values (coalesce(v_event_name, 'Unknown'), p_uploaded_by, p_original_filename, 'pending', jsonb_array_length(p_rows))
  returning id into v_batch_id;

  for v_row in select * from jsonb_array_elements(p_rows)
  loop
    v_total := v_total + 1;
    begin
      select id into v_member_id from members where bits_id = upper(trim(v_row ->> 'bits_id'));

      if v_member_id is null then
        v_results := v_results || jsonb_build_object(
          'bits_id', v_row ->> 'bits_id', 'status', 'error',
          'error', 'no member found with this BITS ID -- they must register via /join first'
        );
        v_failed := v_failed + 1;
        continue;
      end if;

      v_points := points_for_achievement(v_row ->> 'achievement');
      if v_points is null then
        v_results := v_results || jsonb_build_object(
          'bits_id', v_row ->> 'bits_id', 'status', 'error',
          'error', 'unrecognized achievement: ' || coalesce(v_row ->> 'achievement', '<null>')
        );
        v_failed := v_failed + 1;
        continue;
      end if;

      insert into point_transactions (member_id, points, source, event_name, achievement, import_batch_id)
      values (v_member_id, v_points, 'EVENT', v_row ->> 'event_name', v_row ->> 'achievement', v_batch_id)
      on conflict (member_id, event_name, achievement) where source = 'EVENT' do nothing
      returning id into v_tx_id;

      if v_tx_id is null then
        v_results := v_results || jsonb_build_object(
          'bits_id', v_row ->> 'bits_id', 'member_id', v_member_id, 'status', 'duplicate',
          'event_name', v_row ->> 'event_name', 'achievement', v_row ->> 'achievement'
        );
      else
        v_succeeded := v_succeeded + 1;
        v_points_awarded := v_points_awarded + v_points;
        v_results := v_results || jsonb_build_object(
          'bits_id', v_row ->> 'bits_id', 'member_id', v_member_id, 'status', 'awarded',
          'event_name', v_row ->> 'event_name', 'achievement', v_row ->> 'achievement', 'points', v_points
        );
      end if;

    exception when others then
      v_failed := v_failed + 1;
      v_results := v_results || jsonb_build_object(
        'bits_id', v_row ->> 'bits_id', 'status', 'error', 'error', sqlerrm
      );
    end;
  end loop;

  update import_batches
  set status = 'committed',
      succeeded_rows = v_succeeded,
      failed_rows = v_failed,
      points_awarded = v_points_awarded,
      committed_at = now()
  where id = v_batch_id;

  return jsonb_build_object(
    'batch_id', v_batch_id,
    'event_name', v_event_name,
    'total_rows', v_total,
    'succeeded_rows', v_succeeded,
    'failed_rows', v_failed,
    'points_awarded', v_points_awarded,
    'rows', v_results
  );
end;
$$;

grant execute on function import_csv_batch(jsonb, uuid, text) to authenticated;

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

grant execute on function register_member(text, text, text, membership_type, text, text) to anon, authenticated;

drop function if exists register_member(text, text, text, membership_type, text);
