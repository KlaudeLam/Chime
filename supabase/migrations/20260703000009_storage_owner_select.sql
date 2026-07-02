-- The advisor-fix migration (20260703000006) dropped the storage SELECT
-- policies entirely to stop public bucket listing. That also broke DELETE
-- for the owning artist: Supabase Storage's remove() looks up the object
-- row via a SELECT-scoped query before deleting, so with no SELECT policy
-- at all, an owner can't even see their own file to delete it (the DELETE
-- policy itself was always correct -- the row was just invisible).
--
-- Fix: scope SELECT to the owner only, not public. This keeps the original
-- security fix intact (nobody can list/enumerate someone else's files) while
-- letting an artist manage their own uploads. Public playback is unaffected
-- either way since it goes through /object/public/... which bypasses RLS.

create policy "tracks_audio_select_own" on storage.objects
  for select using (
    bucket_id = 'tracks-audio' and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "tracks_thumbnails_select_own" on storage.objects
  for select using (
    bucket_id = 'tracks-thumbnails' and (storage.foldername(name))[1] = (select auth.uid())::text
  );
