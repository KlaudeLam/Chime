import { useEffect, useState } from 'react';
import { fetchFlagQueue, promoteReportToFlag, hideTrack, unflagTrack, hardDeleteTrack, resolveReport } from '../api/admin';
import { ReasonModal } from '../components/ReasonModal';
import { Toast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

export function AdminFlags() {
  const { user: currentUser } = useAuth();
  const [queue, setQueue] = useState([]);
  const [reasonModal, setReasonModal] = useState(null);
  const [toast, setToast] = useState(null);

  function load() {
    fetchFlagQueue().then(setQueue).catch((err) => console.error(err));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUnflag(item) {
    try {
      await unflagTrack(item.track.id);
      setToast({ message: `"${item.track.title}" unflagged.`, tone: 'success' });
      load();
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  }

  async function handleDismiss(item) {
    try {
      await resolveReport(item.reportId);
      setToast({ message: `Report on "${item.track.title}" dismissed.`, tone: 'success' });
      load();
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  }

  function requestReason(action, item) {
    setReasonModal({ action, item });
  }

  async function handleReasonConfirm(reason) {
    const { action, item } = reasonModal;
    setReasonModal(null);
    try {
      if (action === 'flag') {
        await promoteReportToFlag(item.reportId, item.track.id, reason);
        setToast({ message: `"${item.track.title}" flagged.`, tone: 'success' });
      } else if (action === 'hide') {
        await hideTrack(item.track.id, reason);
        if (item.reportId) await resolveReport(item.reportId);
        setToast({ message: `"${item.track.title}" hidden.`, tone: 'success' });
      } else if (action === 'delete') {
        await hardDeleteTrack(item.track, reason, currentUser.id);
        setToast({ message: `"${item.track.title}" permanently deleted.`, tone: 'danger' });
      }
      load();
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Flag control</h2>
      <p className="text-sm text-gray-500">
        Latest first. Fan reports are pending review — promote to an official flag, hide the track, delete it, or dismiss the report.
      </p>

      <div className="flex flex-col gap-2">
        {queue.length === 0 && <p className="text-sm text-gray-400">Nothing flagged or reported right now.</p>}
        {queue.map((item) => (
          <div key={`${item.kind}-${item.reportId ?? item.track.id}`} className="border rounded-lg p-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-semibold">
                  {item.track.title}
                  <span className={`text-xs text-white rounded-full px-2 py-0.5 ml-2 ${item.kind === 'flag' ? 'bg-bittersweet' : 'bg-gray-500'}`}>
                    {item.kind === 'flag' ? 'Flagged' : `Reported by ${item.reporter}`}
                  </span>
                </div>
                <div className="text-sm text-gray-500">by {item.track.artist?.username} · {new Date(item.at).toLocaleString()}</div>
                <div className="text-sm mt-1">Reason: {item.reason}</div>
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                {item.kind === 'report' && (
                  <>
                    <button onClick={() => requestReason('flag', item)} className="rounded-full bg-[#ffd3da] text-black px-3 py-1.5 text-sm">Flag</button>
                    <button onClick={() => handleDismiss(item)} className="rounded-full bg-[#ffd3da] text-black px-3 py-1.5 text-sm">Dismiss</button>
                  </>
                )}
                {item.kind === 'flag' && (
                  <button onClick={() => handleUnflag(item)} className="rounded-full bg-[#ffd3da] text-black px-3 py-1.5 text-sm">Unflag</button>
                )}
                <button onClick={() => requestReason('hide', item)} className="rounded-full bg-[#ffd3da] text-black px-3 py-1.5 text-sm">Hide</button>
                <button onClick={() => requestReason('delete', item)} className="rounded-full bg-bittersweet text-white px-3 py-1.5 text-sm">Delete permanently</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReasonModal
        open={Boolean(reasonModal)}
        title={
          reasonModal?.action === 'flag' ? 'Reason for the official flag'
            : reasonModal?.action === 'hide' ? 'Why are you hiding this track?'
              : 'Why are you permanently deleting this track?'
        }
        defaultValue={reasonModal?.action === 'flag' ? reasonModal.item.reason : ''}
        confirmLabel={reasonModal?.action === 'delete' ? 'Delete permanently' : 'Confirm'}
        onConfirm={handleReasonConfirm}
        onCancel={() => setReasonModal(null)}
      />

      <Toast message={toast?.message} tone={toast?.tone} onDismiss={() => setToast(null)} />
    </div>
  );
}
