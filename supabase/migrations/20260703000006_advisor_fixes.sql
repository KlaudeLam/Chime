-- Fixes for Supabase Advisor security warnings.

-- 1. "Function Search Path Mutable": these two were missed when handle_new_user
-- got an explicit search_path. Without it, the function's unqualified table
-- references can be hijacked by an object earlier in the caller's search_path.
alter function set_updated_at() set search_path = public;
alter function bump_track_play_count() set search_path = public;

-- 2. "Public Bucket Allows Listing": public buckets already serve individual
-- objects via the /storage/v1/object/public/... route without consulting RLS
-- at all, so this SELECT policy was never needed for playback. Its only real
-- effect was letting anyone enumerate every file in the bucket via list().
drop policy "tracks_audio_select_all" on storage.objects;
drop policy "tracks_thumbnails_select_all" on storage.objects;

-- 3. "Public/Signed-In Users Can Execute SECURITY DEFINER Function": Postgres
-- grants EXECUTE to the PUBLIC pseudo-role by default on new functions. Both
-- of these only need to run as triggers (handle_new_user as a row trigger,
-- rls_auto_enable as a platform-managed event trigger that auto-enables RLS
-- on new tables) -- neither needs to be directly callable, and trigger
-- firing does not require the invoking role to hold EXECUTE.
revoke execute on function handle_new_user() from public;
revoke execute on function rls_auto_enable() from public;
