-- ============================================================================
-- Phase 4: "check my points" by BITS ID.
--
-- SECURITY DEFINER because there is no auth.uid() for an anonymous caller to
-- key an RLS policy off of -- this function is the ONLY place bits_id/email
-- ever leave the database, and only to the caller who already typed that
-- exact BITS ID (single exact-match parameter, no search/wildcard support).
-- ============================================================================

create or replace function lookup_member_by_bits_id(p_bits_id text) returns jsonb
language plpgsql
security definer
stable
as $$
declare
  v_member_id uuid;
  v_name text;
  v_total int;
  v_rank int;
  v_history jsonb;
begin
  select id, name into v_member_id, v_name
  from members
  where bits_id = upper(trim(p_bits_id));

  if v_member_id is null then
    return jsonb_build_object('found', false);
  end if;

  select total_points, rank into v_total, v_rank
  from leaderboard
  where member_id = v_member_id;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'event_name', t.event_name,
        'achievement', t.achievement,
        'source', t.source,
        'points', t.points,
        'reason', t.reason,
        'created_at', t.created_at
      )
      order by t.created_at desc
    ),
    '[]'::jsonb
  )
  into v_history
  from point_transactions t
  where t.member_id = v_member_id
    and t.academic_year = current_academic_year();

  return jsonb_build_object(
    'found', true,
    'name', v_name,
    'total_points', coalesce(v_total, 0),
    'rank', v_rank,
    'history', v_history
  );
end;
$$;

grant execute on function lookup_member_by_bits_id(text) to anon, authenticated;
