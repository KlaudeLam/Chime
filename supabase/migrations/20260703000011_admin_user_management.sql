-- Lets an admin update any user's row (specifically for toggling is_admin
-- from the admin panel), alongside the existing owner-only users_update_own.

create policy "users_admin_manage" on users
  for update using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );
