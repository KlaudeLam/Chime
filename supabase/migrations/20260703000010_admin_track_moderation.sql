-- Admin moderation for tracks. Public select now excludes soft-deleted
-- tracks; admins get a separate select policy so they can still see
-- flagged/soft-deleted tracks for review, plus update (flag/unflag,
-- soft-delete/restore) and a genuine hard-delete for content that needs to
-- actually be gone. Hard-delete also needs matching storage policies since
-- an admin removing someone else's track has to remove their audio/
-- thumbnail files too, which the existing owner-only storage policies don't
-- allow.

alter policy "tracks_select_all" on tracks
  using (deleted_at is null);

create policy "tracks_admin_select_all" on tracks
  for select using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "tracks_admin_manage" on tracks
  for update using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "tracks_admin_delete" on tracks
  for delete using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "tracks_audio_admin_manage" on storage.objects
  for all using (
    bucket_id = 'tracks-audio' and exists (
      select 1 from public.users u where u.id = (select auth.uid()) and u.is_admin
    )
  );

create policy "tracks_thumbnails_admin_manage" on storage.objects
  for all using (
    bucket_id = 'tracks-thumbnails' and exists (
      select 1 from public.users u where u.id = (select auth.uid()) and u.is_admin
    )
  );
