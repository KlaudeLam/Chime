import { supabase } from '../lib/supabaseClient';

export async function reportTrack(trackId, reporterId, reason) {
  const { error } = await supabase.from('track_reports').insert({ track_id: trackId, reporter_id: reporterId, reason });
  if (error) throw error;
}
