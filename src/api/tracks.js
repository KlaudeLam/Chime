import { supabase } from '../lib/supabaseClient';

const TRACK_SELECT = '*, artist:users!tracks_artist_id_fkey(username)';

export async function fetchRecentTracks(limit = 10) {
  const { data, error } = await supabase
    .from('tracks')
    .select(TRACK_SELECT)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function fetchTrackById(id) {
  const { data, error } = await supabase
    .from('tracks')
    .select(TRACK_SELECT)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchTracksByArtist(artistId) {
  const { data, error } = await supabase
    .from('tracks')
    .select(TRACK_SELECT)
    .eq('artist_id', artistId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createTrack(track) {
  const { data, error } = await supabase
    .from('tracks')
    .insert(track)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTrack(id) {
  const { error } = await supabase.from('tracks').delete().eq('id', id);
  if (error) throw error;
}

export function trackAudioPath(artistId, trackId) {
  return `${artistId}/${trackId}.mp3`;
}

export function trackThumbnailPath(artistId, trackId) {
  return `${artistId}/${trackId}.jpg`;
}

export function getPublicAudioUrl(path) {
  return supabase.storage.from('tracks-audio').getPublicUrl(path).data.publicUrl;
}

export function getPublicThumbnailUrl(path) {
  return supabase.storage.from('tracks-thumbnails').getPublicUrl(path).data.publicUrl;
}

export async function uploadTrackAudio(path, file) {
  const { error } = await supabase.storage.from('tracks-audio').upload(path, file);
  if (error) throw error;
}

export async function uploadTrackThumbnail(path, file) {
  const { error } = await supabase.storage.from('tracks-thumbnails').upload(path, file);
  if (error) throw error;
}

export async function deleteTrackFiles(audioPath, thumbnailPath) {
  await supabase.storage.from('tracks-audio').remove([audioPath]);
  await supabase.storage.from('tracks-thumbnails').remove([thumbnailPath]);
}
