-- handle_new_user() failed whenever auth.users gained a row with no
-- "username" in raw_user_meta_data (e.g. creating a user from the dashboard's
-- "Add user" form) because public.users.username is NOT NULL. Fall back to a
-- generated username derived from the email so the insert never fails.

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, username, is_artist)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'username',
      split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 8)
    ),
    coalesce((new.raw_user_meta_data->>'is_artist')::boolean, false)
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;
