import { supabase } from '../lib/supabaseClient';
import { trackAudioPath, trackThumbnailPath } from './tracks';

const TRACK_SELECT = '*, artist:users!tracks_artist_id_fkey(username)';

export async function fetchAllTracksForAdmin() {
  const { data, error } = await supabase
    .from('tracks')
    .select(TRACK_SELECT)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function setTrackModeration(id, { is_flagged, deleted_at }) {
  const patch = {};
  if (is_flagged !== undefined) patch.is_flagged = is_flagged;
  if (deleted_at !== undefined) patch.deleted_at = deleted_at;
  const { error } = await supabase.from('tracks').update(patch).eq('id', id);
  if (error) throw error;
}

async function logModeration({ action, targetId, targetTitle, reason, actorId }) {
  const { error } = await supabase.from('moderation_log').insert({
    action, target_type: 'track', target_id: targetId, target_title: targetTitle, reason, actor_id: actorId,
  });
  if (error) throw error;
}

export async function flagTrack(id, reason) {
  const { error } = await supabase
    .from('tracks')
    .update({ is_flagged: true, flag_reason: reason, flagged_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function unflagTrack(id) {
  const { error } = await supabase
    .from('tracks')
    .update({ is_flagged: false, flag_reason: null, flagged_at: null })
    .eq('id', id);
  if (error) throw error;
}

export async function hideTrack(id, reason) {
  // Hiding supersedes flagging -- a track's moderation status is either
  // flagged (needs review) or hidden (already actioned), never both, so
  // hiding always clears any flag and moves it out of the flag queue.
  const { error } = await supabase
    .from('tracks')
    .update({ deleted_at: new Date().toISOString(), hide_reason: reason, is_flagged: false, flag_reason: null, flagged_at: null })
    .eq('id', id);
  if (error) throw error;
}

export async function restoreTrack(id) {
  const { error } = await supabase
    .from('tracks')
    .update({ deleted_at: null, hide_reason: null })
    .eq('id', id);
  if (error) throw error;
}

export async function hardDeleteTrack(track, reason, actorId) {
  await supabase.storage.from('tracks-audio').remove([trackAudioPath(track.artist_id, track.id)]);
  await supabase.storage.from('tracks-thumbnails').remove([trackThumbnailPath(track.artist_id, track.id)]);
  const { error } = await supabase.from('tracks').delete().eq('id', track.id);
  if (error) throw error;
  await logModeration({ action: 'hard_delete', targetId: track.id, targetTitle: track.title, reason, actorId });
}

export async function fetchDeletedTracks() {
  const { data, error } = await supabase
    .from('tracks')
    .select(TRACK_SELECT)
    .not('deleted_at', 'is', null)
    .order('deleted_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchFlagQueue() {
  const [{ data: flagged, error: flagErr }, { data: reports, error: reportErr }] = await Promise.all([
    supabase.from('tracks').select(TRACK_SELECT).eq('is_flagged', true).order('flagged_at', { ascending: false }),
    supabase
      .from('track_reports')
      .select('*, track:tracks(id, title, is_flagged, deleted_at, artist:users!tracks_artist_id_fkey(username)), reporter:users!track_reports_reporter_id_fkey(username)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
  ]);
  if (flagErr) throw flagErr;
  if (reportErr) throw reportErr;

  const flaggedItems = flagged.map((track) => ({
    kind: 'flag', at: track.flagged_at ?? track.updated_at, track, reason: track.flag_reason, reporter: null, reportId: null,
  }));
  const reportItems = reports
    .filter((r) => r.track && !r.track.is_flagged)
    .map((r) => ({
      kind: 'report', at: r.created_at, track: r.track, reason: r.reason, reporter: r.reporter?.username, reportId: r.id,
    }));

  return [...flaggedItems, ...reportItems].sort((a, b) => new Date(b.at) - new Date(a.at));
}

export async function promoteReportToFlag(reportId, trackId, reason) {
  await flagTrack(trackId, reason);
  await resolveReport(reportId);
}

export async function resolveReport(reportId) {
  const { error } = await supabase.from('track_reports').update({ status: 'resolved' }).eq('id', reportId);
  if (error) throw error;
}

export async function searchAdminTracks(query) {
  const { data, error } = await supabase
    .from('tracks')
    .select(TRACK_SELECT)
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return data;
}

export async function searchAdminUsers(query) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .ilike('username', `%${query}%`)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return data;
}

function isoDaysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

async function countRows(query) {
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

export async function fetchTrackAdminDetail(trackId) {
  const { data: track, error } = await supabase.from('tracks').select(TRACK_SELECT).eq('id', trackId).single();
  if (error) throw error;

  const [recentPlays, priorPlays] = await Promise.all([
    countRows(supabase.from('track_plays').select('*', { count: 'exact', head: true }).eq('track_id', trackId).gte('played_at', isoDaysAgo(7))),
    countRows(supabase.from('track_plays').select('*', { count: 'exact', head: true }).eq('track_id', trackId).gte('played_at', isoDaysAgo(14)).lt('played_at', isoDaysAgo(7))),
  ]);

  return { track, recentPlays, priorPlays };
}

export async function fetchUserAdminDetail(userId) {
  const { data: user, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) throw error;

  const [followers, following, newFollowers30d, trackCount, livestreamCount, listensGiven, tracksForPlays] = await Promise.all([
    countRows(supabase.from('follows').select('*', { count: 'exact', head: true }).eq('followee_id', userId)),
    countRows(supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', userId)),
    countRows(supabase.from('follows').select('*', { count: 'exact', head: true }).eq('followee_id', userId).gte('created_at', isoDaysAgo(30))),
    countRows(supabase.from('tracks').select('*', { count: 'exact', head: true }).eq('artist_id', userId)),
    countRows(supabase.from('livestreams').select('*', { count: 'exact', head: true }).eq('artist_id', userId)),
    countRows(supabase.from('track_plays').select('*', { count: 'exact', head: true }).eq('user_id', userId)),
    supabase.from('tracks').select('play_count').eq('artist_id', userId).then(({ data, error }) => {
      if (error) throw error;
      return data;
    }),
  ]);

  const totalPlaysReceived = tracksForPlays.reduce((sum, t) => sum + (t.play_count ?? 0), 0);

  return { user, followers, following, newFollowers30d, trackCount, livestreamCount, listensGiven, totalPlaysReceived };
}

export async function fetchAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function setUserAdmin(id, isAdmin) {
  const { error } = await supabase.from('users').update({ is_admin: isAdmin }).eq('id', id);
  if (error) throw error;
}

const BLOG_POST_SELECT = '*, artist:users!blog_posts_artist_id_fkey(username)';

export async function fetchAllBlogPostsForAdmin() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_POST_SELECT)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function setBlogPostModeration(id, { is_flagged, deleted_at }) {
  const patch = {};
  if (is_flagged !== undefined) patch.is_flagged = is_flagged;
  if (deleted_at !== undefined) patch.deleted_at = deleted_at;
  const { error } = await supabase.from('blog_posts').update(patch).eq('id', id);
  if (error) throw error;
}

export async function hardDeleteBlogPost(id) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

const COMMENT_SELECT = '*, author:users!comments_author_id_fkey(username), blog_post:blog_posts(title), track:tracks(title)';

export async function fetchAllCommentsForAdmin() {
  const { data, error } = await supabase
    .from('comments')
    .select(COMMENT_SELECT)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function setCommentModeration(id, { is_flagged, deleted_at }) {
  const patch = {};
  if (is_flagged !== undefined) patch.is_flagged = is_flagged;
  if (deleted_at !== undefined) patch.deleted_at = deleted_at;
  const { error } = await supabase.from('comments').update(patch).eq('id', id);
  if (error) throw error;
}

export async function hardDeleteComment(id) {
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) throw error;
}

export async function fetchAdminStats() {
  const count = (query) => query.then(({ count, error }) => {
    if (error) throw error;
    return count ?? 0;
  });

  const [users, artists, tracks, flaggedTracks, blogPosts, comments] = await Promise.all([
    count(supabase.from('users').select('*', { count: 'exact', head: true })),
    count(supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_artist', true)),
    count(supabase.from('tracks').select('*', { count: 'exact', head: true })),
    count(supabase.from('tracks').select('*', { count: 'exact', head: true }).eq('is_flagged', true)),
    count(supabase.from('blog_posts').select('*', { count: 'exact', head: true })),
    count(supabase.from('comments').select('*', { count: 'exact', head: true })),
  ]);

  return { users, artists, tracks, flaggedTracks, blogPosts, comments };
}
