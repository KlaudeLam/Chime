-- Auto-create a public.users profile row whenever a new auth.users row is created.
-- Registration passes username/is_artist via supabase.auth.signUp({ options: { data: {...} } }),
-- which lands in auth.users.raw_user_meta_data.

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, username, is_artist)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    coalesce((new.raw_user_meta_data->>'is_artist')::boolean, false)
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger trg_handle_new_user
  after insert on auth.users
  for each row execute function handle_new_user();
