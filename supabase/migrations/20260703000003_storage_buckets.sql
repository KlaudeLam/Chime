-- Storage buckets for track audio/thumbnails, replacing Firebase Storage's
-- "audio/" and "thumbnail/" folders. Objects are stored as
-- "<artist_id>/<track_id>.<ext>" so ownership can be checked from the path,
-- avoiding the old "${title} - ${artist}.mp3" naming (broke on special characters).

insert into storage.buckets (id, name, public)
values ('tracks-audio', 'tracks-audio', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('tracks-thumbnails', 'tracks-thumbnails', true)
on conflict (id) do nothing;

create policy "tracks_audio_select_all" on storage.objects
  for select using (bucket_id = 'tracks-audio');
create policy "tracks_audio_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'tracks-audio' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "tracks_audio_update_own" on storage.objects
  for update using (
    bucket_id = 'tracks-audio' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "tracks_audio_delete_own" on storage.objects
  for delete using (
    bucket_id = 'tracks-audio' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "tracks_thumbnails_select_all" on storage.objects
  for select using (bucket_id = 'tracks-thumbnails');
create policy "tracks_thumbnails_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'tracks-thumbnails' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "tracks_thumbnails_update_own" on storage.objects
  for update using (
    bucket_id = 'tracks-thumbnails' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "tracks_thumbnails_delete_own" on storage.objects
  for delete using (
    bucket_id = 'tracks-thumbnails' and (storage.foldername(name))[1] = auth.uid()::text
  );
