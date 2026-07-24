-- Reason-tracking for track moderation, a fan-facing report queue that
-- admins triage, and an audit log for hard-deletes (the only action whose
-- reason has nowhere to live once the row is gone).

alter table tracks add column flag_reason text;
alter table tracks add column hide_reason text;
alter table tracks add column flagged_at timestamptz;

create table track_reports (
  id          uuid primary key default gen_random_uuid(),
  track_id    uuid not null references tracks(id) on delete cascade,
  reporter_id uuid not null references users(id) on delete cascade,
  reason      text not null,
  status      text not null default 'pending' check (status in ('pending', 'resolved')),
  created_at  timestamptz not null default now()
);
create index on track_reports (track_id);
create index on track_reports (status);
create index on track_reports (reporter_id);

create table moderation_log (
  id           uuid primary key default gen_random_uuid(),
  action       text not null check (action in ('flag', 'unflag', 'hide', 'restore', 'hard_delete')),
  target_type  text not null default 'track',
  target_id    uuid,
  target_title text,
  reason       text,
  actor_id     uuid references users(id) on delete set null,
  created_at   timestamptz not null default now()
);
create index on moderation_log (created_at desc);

alter table track_reports enable row level security;
alter table moderation_log enable row level security;

-- Any fan can report a track under their own id; only admins can triage.
create policy "track_reports_insert_own" on track_reports
  for insert with check (reporter_id = (select auth.uid()));

create policy "track_reports_admin_select" on track_reports
  for select using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "track_reports_admin_update" on track_reports
  for update using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

-- Log is admin-write, admin-read only.
create policy "moderation_log_admin_select" on moderation_log
  for select using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "moderation_log_admin_insert" on moderation_log
  for insert with check (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

grant insert, select, update on public.track_reports to authenticated;
grant select, insert on public.moderation_log to authenticated;

-- track_plays had no select policy at all (insert-only log) -- admin "growth"
-- stats need to read it.
create policy "track_plays_admin_select" on track_plays
  for select using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

grant select on public.track_plays to authenticated;
