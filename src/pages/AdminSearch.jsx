import { useState } from 'react';
import {
  searchAdminUsers, searchAdminTracks,
  fetchUserAdminDetail, fetchTrackAdminDetail,
  setUserAdmin, flagTrack, hideTrack, hardDeleteTrack,
} from '../api/admin';
import { ReasonModal } from '../components/ReasonModal';
import { Toast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

function growthLabel(recent, prior) {
  if (prior === 0) return recent > 0 ? `new — +${recent} in the last 7 days` : 'no plays yet';
  const pct = Math.round(((recent - prior) / prior) * 100);
  return `${pct >= 0 ? '+' : ''}${pct}% vs. the previous 7 days`;
}

export function AdminSearch() {
  const { user: currentUser } = useAuth();
  const [query, setQuery] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [trackResults, setTrackResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [reasonModal, setReasonModal] = useState(null);
  const [toast, setToast] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setSelectedUser(null);
    setSelectedTrack(null);
    if (!query.trim()) {
      setUserResults([]);
      setTrackResults([]);
      return;
    }
    const [users, tracks] = await Promise.all([searchAdminUsers(query), searchAdminTracks(query)]);
    setUserResults(users);
    setTrackResults(tracks);
  }

  async function openUser(u) {
    const detail = await fetchUserAdminDetail(u.id);
    setSelectedUser(detail);
    setSelectedTrack(null);
  }

  async function openTrack(t) {
    const detail = await fetchTrackAdminDetail(t.id);
    setSelectedTrack(detail);
    setSelectedUser(null);
  }

  async function handleToggleAdmin() {
    const willBeAdmin = !selectedUser.user.is_admin;
    try {
      await setUserAdmin(selectedUser.user.id, willBeAdmin);
      setToast({ message: `${selectedUser.user.username} ${willBeAdmin ? 'promoted to admin' : 'demoted'}.`, tone: 'success' });
      openUser(selectedUser.user);
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  }

  function requestReason(action) {
    setReasonModal({ action });
  }

  async function handleReasonConfirm(reason) {
    const { action } = reasonModal;
    const track = selectedTrack.track;
    setReasonModal(null);
    try {
      if (action === 'flag') {
        await flagTrack(track.id, reason);
        setToast({ message: `"${track.title}" flagged.`, tone: 'success' });
      }
      if (action === 'hide') {
        await hideTrack(track.id, reason);
        setToast({ message: `"${track.title}" hidden.`, tone: 'success' });
      }
      if (action === 'delete') {
        await hardDeleteTrack(track, reason, currentUser.id);
        setToast({ message: `"${track.title}" permanently deleted.`, tone: 'danger' });
      }

      if (action === 'delete') {
        setSelectedTrack(null);
        setTrackResults((prev) => prev.filter((t) => t.id !== track.id));
      } else {
        openTrack(track);
      }
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users or tracks..."
          className="w-full max-w-md rounded-full border px-4 py-2 text-sm"
        />
        <button type="submit" className="rounded-full bg-bittersweet text-white px-4 py-2 text-sm">Search</button>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Users</h3>
          <div className="flex flex-col gap-2">
            {userResults.map((u) => (
              <button key={u.id} onClick={() => openUser(u)} className="text-left border rounded-lg p-3 hover:bg-gray-50">
                <div className="font-semibold">{u.username}</div>
                <div className="text-sm text-gray-500">{u.is_admin ? 'Admin' : u.is_artist ? 'Artist' : 'Fan'}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Tracks</h3>
          <div className="flex flex-col gap-2">
            {trackResults.map((t) => (
              <button key={t.id} onClick={() => openTrack(t)} className="text-left border rounded-lg p-3 hover:bg-gray-50">
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-gray-500">by {t.artist?.username}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedUser && (
        <div className="border rounded-lg p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
            <div>
              <div className="text-xl font-semibold">
                {selectedUser.user.username}
                {selectedUser.user.is_admin && <span className="text-xs text-white bg-bittersweet rounded-full px-2 py-0.5 ml-2">Admin</span>}
              </div>
              <div className="text-sm text-gray-500">
                {selectedUser.user.is_artist ? 'Artist' : 'Fan'} · joined {new Date(selectedUser.user.created_at).toLocaleDateString()}
              </div>
            </div>
            <button onClick={handleToggleAdmin} className="rounded-full bg-[#ffd3da] text-black px-3 py-1.5 text-sm">
              {selectedUser.user.is_admin ? 'Demote' : 'Promote to admin'}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div><span className="font-semibold">{selectedUser.followers}</span> followers</div>
            <div><span className="font-semibold">{selectedUser.following}</span> following</div>
            <div><span className="font-semibold">+{selectedUser.newFollowers30d}</span> new followers (30d)</div>
            <div><span className="font-semibold">{selectedUser.trackCount}</span> tracks published</div>
            <div><span className="font-semibold">{selectedUser.totalPlaysReceived}</span> total plays received</div>
            <div><span className="font-semibold">{selectedUser.listensGiven}</span> tracks listened to</div>
            <div><span className="font-semibold">{selectedUser.livestreamCount}</span> events / livestreams</div>
          </div>
        </div>
      )}

      {selectedTrack && (
        <div className="border rounded-lg p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
            <div>
              <div className="text-xl font-semibold">
                {selectedTrack.track.title}
                {selectedTrack.track.is_flagged && <span className="text-xs text-white bg-bittersweet rounded-full px-2 py-0.5 ml-2">Flagged</span>}
                {selectedTrack.track.deleted_at && <span className="text-xs text-white bg-gray-500 rounded-full px-2 py-0.5 ml-2">Hidden</span>}
              </div>
              <div className="text-sm text-gray-500">
                by {selectedTrack.track.artist?.username} · published {new Date(selectedTrack.track.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {!selectedTrack.track.is_flagged && (
                <button onClick={() => requestReason('flag')} className="rounded-full bg-[#ffd3da] text-black px-3 py-1.5 text-sm">Flag</button>
              )}
              {!selectedTrack.track.deleted_at && (
                <button onClick={() => requestReason('hide')} className="rounded-full bg-[#ffd3da] text-black px-3 py-1.5 text-sm">Hide</button>
              )}
              <button onClick={() => requestReason('delete')} className="rounded-full bg-bittersweet text-white px-3 py-1.5 text-sm">Delete permanently</button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div><span className="font-semibold">{selectedTrack.track.play_count}</span> total plays</div>
            <div><span className="font-semibold">{selectedTrack.recentPlays}</span> plays (last 7d)</div>
            <div>{growthLabel(selectedTrack.recentPlays, selectedTrack.priorPlays)}</div>
          </div>
        </div>
      )}

      <ReasonModal
        open={Boolean(reasonModal)}
        title={
          reasonModal?.action === 'flag' ? 'Why are you flagging this track?'
            : reasonModal?.action === 'hide' ? 'Why are you hiding this track?'
              : 'Why are you permanently deleting this track?'
        }
        confirmLabel={reasonModal?.action === 'delete' ? 'Delete permanently' : 'Confirm'}
        onConfirm={handleReasonConfirm}
        onCancel={() => setReasonModal(null)}
      />

      <Toast message={toast?.message} tone={toast?.tone} onDismiss={() => setToast(null)} />
    </div>
  );
}
