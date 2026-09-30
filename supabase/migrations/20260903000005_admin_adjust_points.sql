-- ============================================================================
-- Phase 7: manual point adjustments.
--
-- Never touches a total column -- there isn't one. Every adjustment is a new
-- MANUAL_ADJUSTMENT row in the ledger with the acting admin's identity and a
-- required reason, satisfying the audit-trail requirement.
-- ============================================================================

create or replace function admin_adjust_points(
  p_member_id uuid,
  p_points int,
  p_reason text
) returns jsonb
language plpgsql
security definer
as $$
declare
  v_admin_id uuid;
  v_tx_id uuid;
begin
  if not is_admin() then
    raise exception 'not_authorized';
  end if;

  if p_points = 0 then
    raise exception 'points_must_be_nonzero';
  end if;

  if trim(coalesce(p_reason, '')) = '' then
    raise exception 'reason_required';
  end if;

  select id into v_admin_id from admins where auth_user_id = auth.uid();
  if v_admin_id is null then
    raise exception 'not_authorized';
  end if;

  insert into point_transactions (member_id, points, source, reason, created_by_admin)
  values (p_member_id, p_points, 'MANUAL_ADJUSTMENT', p_reason, v_admin_id)
  returning id into v_tx_id;

  return jsonb_build_object('transaction_id', v_tx_id);
end;
$$;

grant execute on function admin_adjust_points(uuid, int, text) to authenticated;
