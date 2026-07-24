import { useEffect, useState } from 'react';
import { fetchDeletedTracks, restoreTrack, hardDeleteTrack } from '../api/admin';
import { ReasonModal } from '../components/ReasonModal';
import { Toast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

export function AdminHidden() {
  const { user: currentUser } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  function load() {
    fetchDeletedTracks().then(setTracks).catch((err) => console.error(err));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleRestore(track) {
    try {
      await restoreTrack(track.id);
      setToast({ message: `"${track.title}" restored.`, tone: 'success' });
      load();
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  }

  async function handleDeleteConfirm(reason) {
    const track = deleteTarget;
    setDeleteTarget(null);
    try {
      await hardDeleteTrack(track, reason, currentUser.id);
      setToast({ message: `"${track.title}" permanently deleted.`, tone: 'danger' });
      load();
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Hidden content</h2>
      <p className="text-sm text-gray-500">Hidden tracks, latest first. Restore makes it public again; delete permanently is final.</p>

      <div className="flex flex-col gap-2">
        {tracks.length === 0 && <p className="text-sm text-gray-400">Nothing hidden right now.</p>}
        {tracks.map((track) => (
          <div key={track.id} className="border rounded-lg p-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-semibold">
                  {track.title}
                  <span className="text-xs text-white bg-gray-500 rounded-full px-2 py-0.5 ml-2">Hidden</span>
                </div>
                <div className="text-sm text-gray-500">by {track.artist?.username} · hidden {new Date(track.deleted_at).toLocaleString()}</div>
                <div className="text-sm mt-1">Reason: {track.hide_reason ?? '—'}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleRestore(track)} className="rounded-full bg-[#ffd3da] text-black px-3 py-1.5 text-sm">Restore</button>
                <button onClick={() => setDeleteTarget(track)} className="rounded-full bg-bittersweet text-white px-3 py-1.5 text-sm">Delete permanently</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReasonModal
        open={Boolean(deleteTarget)}
        title="Why are you permanently deleting this track?"
        confirmLabel="Delete permanently"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast message={toast?.message} tone={toast?.tone} onDismiss={() => setToast(null)} />
    </div>
  );
}
