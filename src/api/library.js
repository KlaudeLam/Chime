import { supabase } from '../lib/supabaseClient';

export async function fetchLibraryTracks(userId) {
  const { data, error } = await supabase
    .from('library_items')
    .select('added_at, tracks(*, artist:users!tracks_artist_id_fkey(username))')
    .eq('user_id', userId)
    .order('added_at', { ascending: false });
  if (error) throw error;
  return data.map((row) => row.tracks);
}

export async function isTrackInLibrary(userId, trackId) {
  const { data, error } = await supabase
    .from('library_items')
    .select('track_id')
    .eq('user_id', userId)
    .eq('track_id', trackId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function addTrackToLibrary(userId, trackId) {
  const { error } = await supabase
    .from('library_items')
    .insert({ user_id: userId, track_id: trackId });
  if (error) throw error;
}

export async function removeTrackFromLibrary(userId, trackId) {
  const { error } = await supabase
    .from('library_items')
    .delete()
    .eq('user_id', userId)
    .eq('track_id', trackId);
  if (error) throw error;
}
