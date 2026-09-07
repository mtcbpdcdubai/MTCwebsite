-- ============================================================================
-- Phase 2: server-side points calculation + atomic CSV import
-- ============================================================================

create or replace function points_for_achievement(p_achievement text) returns int
language sql immutable as $$
  select case p_achievement
    when 'PARTICIPANT' then 1
    when 'FIRST' then 5
    when 'SECOND' then 3
    when 'THIRD' then 2
    when 'SPECIAL' then 3
    else null
  end;
$$;

comment on function points_for_achievement(text) is 'The only place event points are computed. Achievement strings are normalized to PARTICIPANT/FIRST/SECOND/THIRD/SPECIAL by the csv-validate/csv-import Edge Functions before reaching this function.';

-- Atomically commits a validated batch of CSV rows: resolves/creates members,
-- computes points, and inserts ledger rows relying on the partial unique
-- index on point_transactions for idempotency (ON CONFLICT DO NOTHING) so a
-- re-imported row is silently skipped rather than double-awarded or erroring
-- out the whole batch. Each row runs in its own sub-transaction (the nested
-- BEGIN/EXCEPTION block) so one bad row can't abort the rest of the import.
create or replace function import_csv_batch(
  p_rows jsonb,              -- [{bits_id, name, email, event_name, achievement}, ...]
  p_uploaded_by uuid,        -- admins.id
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
        if coalesce(v_row ->> 'email', '') = '' or coalesce(v_row ->> 'name', '') = '' then
          v_results := v_results || jsonb_build_object(
            'bits_id', v_row ->> 'bits_id', 'status', 'error',
            'error', 'unknown BITS ID and no name/email to create a member'
          );
          v_failed := v_failed + 1;
          continue;
        end if;
        insert into members (bits_id, name, email)
        values (v_row ->> 'bits_id', v_row ->> 'name', v_row ->> 'email')
        returning id into v_member_id;
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
