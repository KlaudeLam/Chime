-- Chime database schema (Postgres / Supabase)

create extension if not exists pgcrypto;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- Users (profile row, one-to-one with Supabase auth.users)
-- ============================================================
create table users (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  is_artist   boolean not null default false,
  is_admin    boolean not null default false,
  avatar_url  text,
  bio         text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger trg_users_updated_at
  before update on users for each row execute function set_updated_at();

-- ============================================================
-- Tracks
-- ============================================================
create table tracks (
  id            uuid primary key default gen_random_uuid(),
  artist_id     uuid not null references users(id) on delete cascade,
  title         text not null,
  description   text,
  genre         text,
  audio_url     text not null,
  thumbnail_url text not null,
  duration_sec  integer,
  play_count    bigint not null default 0,
  is_flagged    boolean not null default false,
  deleted_at    timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index on tracks (artist_id);
create index on tracks (created_at desc);
create trigger trg_tracks_updated_at
  before update on tracks for each row execute function set_updated_at();

-- Insert-only play log; play_count is derived from this, never written directly by clients.
create table track_plays (
  id        uuid primary key default gen_random_uuid(),
  track_id  uuid not null references tracks(id) on delete cascade,
  user_id   uuid references users(id) on delete set null,
  played_at timestamptz not null default now()
);
create index on track_plays (track_id);
create index on track_plays (user_id);

create or replace function bump_track_play_count()
returns trigger as $$
begin
  update tracks set play_count = play_count + 1 where id = new.track_id;
  return new;
end;
$$ language plpgsql;

create trigger trg_track_plays_bump_count
  after insert on track_plays for each row execute function bump_track_play_count();

-- ============================================================
-- Library (fan-saved tracks) and playlists
-- ============================================================
create table library_items (
  user_id  uuid not null references users(id) on delete cascade,
  track_id uuid not null references tracks(id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (user_id, track_id)
);

create table playlists (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references users(id) on delete cascade,
  name       text not null,
  created_at timestamptz not null default now()
);
create index on playlists (user_id);

create table playlist_tracks (
  playlist_id uuid not null references playlists(id) on delete cascade,
  track_id    uuid not null references tracks(id) on delete cascade,
  position    integer not null,
  primary key (playlist_id, track_id)
);

-- ============================================================
-- Follows (self-referencing many-to-many on users)
-- ============================================================
create table follows (
  follower_id uuid not null references users(id) on delete cascade,
  followee_id uuid not null references users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (follower_id, followee_id),
  check (follower_id <> followee_id)
);
create index on follows (followee_id);

-- ============================================================
-- Fanblog posts + threaded comments (on a post or a track)
-- ============================================================
create table blog_posts (
  id         uuid primary key default gen_random_uuid(),
  artist_id  uuid not null references users(id) on delete cascade,
  title      text not null,
  body       text not null,
  is_flagged boolean not null default false,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on blog_posts (artist_id);
create trigger trg_blog_posts_updated_at
  before update on blog_posts for each row execute function set_updated_at();

create table comments (
  id                uuid primary key default gen_random_uuid(),
  author_id         uuid not null references users(id) on delete cascade,
  blog_post_id      uuid references blog_posts(id) on delete cascade,
  track_id          uuid references tracks(id) on delete cascade,
  parent_comment_id uuid references comments(id) on delete cascade,
  body              text not null,
  is_flagged        boolean not null default false,
  deleted_at        timestamptz,
  created_at        timestamptz not null default now(),
  check (num_nonnulls(blog_post_id, track_id) = 1)
);
create index on comments (blog_post_id);
create index on comments (track_id);
create index on comments (parent_comment_id);

-- ============================================================
-- Livestreams
-- ============================================================
create table livestreams (
  id         uuid primary key default gen_random_uuid(),
  artist_id  uuid not null references users(id) on delete cascade,
  title      text not null,
  status     text not null default 'scheduled'
             check (status in ('scheduled', 'live', 'ended')),
  stream_url text,
  started_at timestamptz,
  ended_at   timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on livestreams (artist_id);
create trigger trg_livestreams_updated_at
  before update on livestreams for each row execute function set_updated_at();

-- ============================================================
-- Marketplace
-- ============================================================
create table products (
  id          uuid primary key default gen_random_uuid(),
  artist_id   uuid not null references users(id) on delete cascade,
  name        text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  image_url   text,
  inventory   integer not null default 0 check (inventory >= 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index on products (artist_id);
create trigger trg_products_updated_at
  before update on products for each row execute function set_updated_at();

create table orders (
  id          uuid primary key default gen_random_uuid(),
  buyer_id    uuid not null references users(id),
  product_id  uuid not null references products(id),
  quantity    integer not null default 1 check (quantity > 0),
  total_cents integer not null check (total_cents >= 0),
  status      text not null default 'pending'
              check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  created_at  timestamptz not null default now()
);
create index on orders (buyer_id);
create index on orders (product_id);
