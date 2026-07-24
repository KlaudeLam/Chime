-- Admin moderation for blog_posts and comments, mirroring
-- 20260703000010_admin_track_moderation.sql: public select now excludes
-- soft-deleted rows, admins get a separate select policy so they can still
-- see flagged/soft-deleted content for review, plus update (flag/unflag,
-- soft-delete/restore) and hard-delete.

alter policy "blog_posts_select_all" on blog_posts
  using (deleted_at is null);

create policy "blog_posts_admin_select_all" on blog_posts
  for select using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "blog_posts_admin_manage" on blog_posts
  for update using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "blog_posts_admin_delete" on blog_posts
  for delete using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

alter policy "comments_select_all" on comments
  using (deleted_at is null);

create policy "comments_admin_select_all" on comments
  for select using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "comments_admin_manage" on comments
  for update using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );

create policy "comments_admin_delete" on comments
  for delete using (
    exists (select 1 from users u where u.id = (select auth.uid()) and u.is_admin)
  );
