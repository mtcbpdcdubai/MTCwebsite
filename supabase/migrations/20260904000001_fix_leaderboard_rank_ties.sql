-- ============================================================================
-- Fix: leaderboard rank ties were broken by real-world data.
--
-- The original view computed rank() over (order by total_points desc,
-- first_scored_at asc) -- putting the tie-break column INSIDE the rank()
-- window's ORDER BY. Postgres's rank() only treats rows as peers (same rank)
-- when EVERY column in that ORDER BY matches. Since first_scored_at is a
-- real timestamp, two members with equal points almost never have the exact
-- same value (this only happened by coincidence when two rows were inserted
-- in the same transaction), so equal-point members were nearly always split
-- into sequential ranks (2, 3, 4, ...) instead of sharing one -- the exact
-- "artificial rank gap" the design explicitly said to avoid.
--
-- Fix: rank() now orders by total_points ALONE, so true ties always share a
-- rank. first_scored_at is exposed on the view so callers can add it as a
-- secondary ORDER BY for stable display order among tied members, without
-- it ever affecting the rank NUMBER itself.
-- ============================================================================

create or replace view leaderboard as
  select
    member_id,
    name,
    total_points,
    rank() over (order by total_points desc) as rank,
    first_scored_at
  from member_totals;

comment on view leaderboard is 'Standard competition ranking (ties share a rank, e.g. 1,2,2,4) based on total_points ALONE. first_scored_at is provided only so callers can add a stable secondary sort for display order among tied members -- it must never be added to the rank() window itself.';
