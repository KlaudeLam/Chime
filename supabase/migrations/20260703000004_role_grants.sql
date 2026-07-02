-- Postgres GRANTs for the anon/authenticated roles. RLS policies (previous migration)
-- decide *which rows* a role can see/touch; these GRANTs decide *whether the role can
-- touch the table at all*. Tables created via the dashboard get sane default grants
-- automatically -- tables created via raw SQL migrations (like ours) do not, so this
-- has to be explicit.

grant usage on schema public to anon, authenticated;

-- Public read: visible to logged-out browsing (anon) and logged-in users alike.
grant select on
  public.users,
  public.tracks,
  public.follows,
  public.blog_posts,
  public.comments,
  public.livestreams,
  public.products
to anon, authenticated;

-- Authenticated-only reads (private to the owner; RLS narrows the rows).
grant select on
  public.library_items,
  public.playlists,
  public.playlist_tracks,
  public.orders
to authenticated;

-- Authenticated writes (RLS policies from the previous migration narrow these to
-- the owning row in every case).
grant update on public.users to authenticated;
grant insert, update, delete on public.tracks to authenticated;
grant insert on public.track_plays to authenticated;
grant insert, delete on public.library_items to authenticated;
grant insert, update, delete on public.playlists to authenticated;
grant insert, delete on public.playlist_tracks to authenticated;
grant insert, delete on public.follows to authenticated;
grant insert, update, delete on public.blog_posts to authenticated;
grant insert, update, delete on public.comments to authenticated;
grant insert, update, delete on public.livestreams to authenticated;
grant insert, update, delete on public.products to authenticated;
grant insert on public.orders to authenticated;
