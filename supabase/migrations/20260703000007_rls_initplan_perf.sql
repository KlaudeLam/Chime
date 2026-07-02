-- Perf fix flagged by Supabase's Performance Advisor (auth_rls_initplan):
-- auth.uid() called directly in a policy is re-evaluated once per row scanned.
-- Wrapping it as (select auth.uid()) lets Postgres hoist it into an InitPlan
-- and evaluate it once per query instead. Same fix applied everywhere the
-- pattern appears, including the storage.objects policies (not caught by
-- this particular scan, but subject to the same issue).

alter policy "users_update_own" on users
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

alter policy "tracks_insert_own" on tracks
  with check (artist_id = (select auth.uid()));
alter policy "tracks_update_own" on tracks
  using (artist_id = (select auth.uid())) with check (artist_id = (select auth.uid()));
alter policy "tracks_delete_own" on tracks
  using (artist_id = (select auth.uid()));

alter policy "track_plays_insert_own" on track_plays
  with check ((select auth.uid()) = user_id);

alter policy "library_items_select_own" on library_items
  using (user_id = (select auth.uid()));
alter policy "library_items_insert_own" on library_items
  with check (user_id = (select auth.uid()));
alter policy "library_items_delete_own" on library_items
  using (user_id = (select auth.uid()));

alter policy "playlists_select_own" on playlists
  using (user_id = (select auth.uid()));
alter policy "playlists_insert_own" on playlists
  with check (user_id = (select auth.uid()));
alter policy "playlists_update_own" on playlists
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
alter policy "playlists_delete_own" on playlists
  using (user_id = (select auth.uid()));

alter policy "playlist_tracks_select_own" on playlist_tracks
  using (exists (select 1 from playlists p where p.id = playlist_tracks.playlist_id and p.user_id = (select auth.uid())));
alter policy "playlist_tracks_insert_own" on playlist_tracks
  with check (exists (select 1 from playlists p where p.id = playlist_tracks.playlist_id and p.user_id = (select auth.uid())));
alter policy "playlist_tracks_delete_own" on playlist_tracks
  using (exists (select 1 from playlists p where p.id = playlist_tracks.playlist_id and p.user_id = (select auth.uid())));

alter policy "follows_insert_own" on follows
  with check (follower_id = (select auth.uid()));
alter policy "follows_delete_own" on follows
  using (follower_id = (select auth.uid()));

alter policy "blog_posts_insert_own" on blog_posts
  with check (artist_id = (select auth.uid()));
alter policy "blog_posts_update_own" on blog_posts
  using (artist_id = (select auth.uid())) with check (artist_id = (select auth.uid()));
alter policy "blog_posts_delete_own" on blog_posts
  using (artist_id = (select auth.uid()));

alter policy "comments_insert_own" on comments
  with check (author_id = (select auth.uid()));
alter policy "comments_update_own" on comments
  using (author_id = (select auth.uid())) with check (author_id = (select auth.uid()));
alter policy "comments_delete_own" on comments
  using (author_id = (select auth.uid()));

alter policy "livestreams_insert_own" on livestreams
  with check (artist_id = (select auth.uid()));
alter policy "livestreams_update_own" on livestreams
  using (artist_id = (select auth.uid())) with check (artist_id = (select auth.uid()));
alter policy "livestreams_delete_own" on livestreams
  using (artist_id = (select auth.uid()));

alter policy "products_insert_own" on products
  with check (artist_id = (select auth.uid()));
alter policy "products_update_own" on products
  using (artist_id = (select auth.uid())) with check (artist_id = (select auth.uid()));
alter policy "products_delete_own" on products
  using (artist_id = (select auth.uid()));

alter policy "orders_select_own" on orders
  using (buyer_id = (select auth.uid()));
alter policy "orders_insert_own" on orders
  with check (buyer_id = (select auth.uid()));

-- Storage policies (same issue, not surfaced in this particular scan)
alter policy "tracks_audio_insert_own" on storage.objects
  with check (bucket_id = 'tracks-audio' and (storage.foldername(name))[1] = (select auth.uid())::text);
alter policy "tracks_audio_update_own" on storage.objects
  using (bucket_id = 'tracks-audio' and (storage.foldername(name))[1] = (select auth.uid())::text);
alter policy "tracks_audio_delete_own" on storage.objects
  using (bucket_id = 'tracks-audio' and (storage.foldername(name))[1] = (select auth.uid())::text);

alter policy "tracks_thumbnails_insert_own" on storage.objects
  with check (bucket_id = 'tracks-thumbnails' and (storage.foldername(name))[1] = (select auth.uid())::text);
alter policy "tracks_thumbnails_update_own" on storage.objects
  using (bucket_id = 'tracks-thumbnails' and (storage.foldername(name))[1] = (select auth.uid())::text);
alter policy "tracks_thumbnails_delete_own" on storage.objects
  using (bucket_id = 'tracks-thumbnails' and (storage.foldername(name))[1] = (select auth.uid())::text);
