import { supabase } from '../lib/supabaseClient';

export async function fetchFollowCounts(userId) {
  const [{ count: followers, error: followersError }, { count: following, error: followingError }] = await Promise.all([
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('followee_id', userId),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', userId),
  ]);
  if (followersError) throw followersError;
  if (followingError) throw followingError;
  return { followers: followers ?? 0, following: following ?? 0 };
}

export async function isFollowing(followerId, followeeId) {
  const { data, error } = await supabase
    .from('follows')
    .select('followee_id')
    .eq('follower_id', followerId)
    .eq('followee_id', followeeId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function followUser(followerId, followeeId) {
  const { error } = await supabase.from('follows').insert({ follower_id: followerId, followee_id: followeeId });
  if (error) throw error;
}

export async function unfollowUser(followerId, followeeId) {
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('followee_id', followeeId);
  if (error) throw error;
}
