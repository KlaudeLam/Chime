-- Row Level Security for all tables. Functional this phase: users, tracks, library_items.
-- The rest (unused until their features are built) get the same owner-write/public-read
-- shape so nothing is left open by default.

alter table users            enable row level security;
alter table tracks           enable row level security;
alter table track_plays      enable row level security;
alter table library_items    enable row level security;
alter table playlists        enable row level security;
alter table playlist_tracks  enable row level security;
alter table follows          enable row level security;
alter table blog_posts       enable row level security;
alter table comments         enable row level security;
alter table livestreams      enable row level security;
alter table products         enable row level security;
alter table orders           enable row level security;

-- users: public profiles, owner-only edits. Inserts happen via the handle_new_user
-- trigger (security definer), not directly by clients.
create policy "users_select_all" on users
  for select using (true);
create policy "users_update_own" on users
  for update using (id = auth.uid()) with check (id = auth.uid());

-- tracks: public catalog, owner-only writes.
create policy "tracks_select_all" on tracks
  for select using (true);
create policy "tracks_insert_own" on tracks
  for insert with check (artist_id = auth.uid());
create policy "tracks_update_own" on tracks
  for update using (artist_id = auth.uid()) with check (artist_id = auth.uid());
create policy "tracks_delete_own" on tracks
  for delete using (artist_id = auth.uid());

-- track_plays: insert-only log, no client reads yet.
create policy "track_plays_insert_own" on track_plays
  for insert with check (auth.uid() = user_id);

-- library_items: fully private to the owning fan.
create policy "library_items_select_own" on library_items
  for select using (user_id = auth.uid());
create policy "library_items_insert_own" on library_items
  for insert with check (user_id = auth.uid());
create policy "library_items_delete_own" on library_items
  for delete using (user_id = auth.uid());

-- playlists: private to the owner (no sharing feature yet).
create policy "playlists_select_own" on playlists
  for select using (user_id = auth.uid());
create policy "playlists_insert_own" on playlists
  for insert with check (user_id = auth.uid());
create policy "playlists_update_own" on playlists
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "playlists_delete_own" on playlists
  for delete using (user_id = auth.uid());

create policy "playlist_tracks_select_own" on playlist_tracks
  for select using (
    exists (select 1 from playlists p where p.id = playlist_tracks.playlist_id and p.user_id = auth.uid())
  );
create policy "playlist_tracks_insert_own" on playlist_tracks
  for insert with check (
    exists (select 1 from playlists p where p.id = playlist_tracks.playlist_id and p.user_id = auth.uid())
  );
create policy "playlist_tracks_delete_own" on playlist_tracks
  for delete using (
    exists (select 1 from playlists p where p.id = playlist_tracks.playlist_id and p.user_id = auth.uid())
  );

-- follows: public (follower lists/counts are public info), owner manages own follow rows.
create policy "follows_select_all" on follows
  for select using (true);
create policy "follows_insert_own" on follows
  for insert with check (follower_id = auth.uid());
create policy "follows_delete_own" on follows
  for delete using (follower_id = auth.uid());

-- blog_posts: public fanblogs, owner-only writes.
create policy "blog_posts_select_all" on blog_posts
  for select using (true);
create policy "blog_posts_insert_own" on blog_posts
  for insert with check (artist_id = auth.uid());
create policy "blog_posts_update_own" on blog_posts
  for update using (artist_id = auth.uid()) with check (artist_id = auth.uid());
create policy "blog_posts_delete_own" on blog_posts
  for delete using (artist_id = auth.uid());

-- comments: public, owner-only writes.
create policy "comments_select_all" on comments
  for select using (true);
create policy "comments_insert_own" on comments
  for insert with check (author_id = auth.uid());
create policy "comments_update_own" on comments
  for update using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "comments_delete_own" on comments
  for delete using (author_id = auth.uid());

-- livestreams: public, owner-only writes.
create policy "livestreams_select_all" on livestreams
  for select using (true);
create policy "livestreams_insert_own" on livestreams
  for insert with check (artist_id = auth.uid());
create policy "livestreams_update_own" on livestreams
  for update using (artist_id = auth.uid()) with check (artist_id = auth.uid());
create policy "livestreams_delete_own" on livestreams
  for delete using (artist_id = auth.uid());

-- products: public catalog, owner-only writes.
create policy "products_select_all" on products
  for select using (true);
create policy "products_insert_own" on products
  for insert with check (artist_id = auth.uid());
create policy "products_update_own" on products
  for update using (artist_id = auth.uid()) with check (artist_id = auth.uid());
create policy "products_delete_own" on products
  for delete using (artist_id = auth.uid());

-- orders: private to the buyer. No update/delete policy yet (order status transitions
-- belong to a future admin/seller flow, not the client).
create policy "orders_select_own" on orders
  for select using (buyer_id = auth.uid());
create policy "orders_insert_own" on orders
  for insert with check (buyer_id = auth.uid());
