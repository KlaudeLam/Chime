import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTrackContextMenu } from '../contexts/TrackContextMenuContext';
import { addTrackToLibrary, isTrackInLibrary } from '../api/library';
import { reportTrack } from '../api/reports';
import { ReasonModal } from './ReasonModal';

export function TrackContextMenu() {
  const { user } = useAuth();
  const { menu, closeMenu } = useTrackContextMenu();
  const [reportTrackId, setReportTrackId] = useState(null);

  useEffect(() => {
    if (!menu) return;
    function handleOutsideClick() {
      closeMenu();
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menu]);

  async function handleAddToLibrary() {
    if (!menu || !user) return;
    const trackId = menu.trackId;
    closeMenu();
    try {
      if (await isTrackInLibrary(user.id, trackId)) {
        alert('This track is already added.');
        return;
      }
      await addTrackToLibrary(user.id, trackId);
      alert('Track added successfully');
    } catch (err) {
      alert(`Failed to add track: ${err.message}`);
    }
  }

  function handleReportClick() {
    if (!menu) return;
    if (!user) {
      closeMenu();
      alert('Log in to report a track.');
      return;
    }
    setReportTrackId(menu.trackId);
    closeMenu();
  }

  async function handleReportConfirm(reason) {
    const trackId = reportTrackId;
    setReportTrackId(null);
    try {
      await reportTrack(trackId, user.id, reason);
      alert('Thanks — this track has been reported to our moderators.');
    } catch (err) {
      alert(`Failed to report track: ${err.message}`);
    }
  }

  return (
    <>
      {menu && (
        <ul
          className="fixed z-50 min-w-[170px] bg-white text-black text-sm rounded-lg shadow-lg border border-gray-200 overflow-hidden py-1"
          style={{ left: menu.x, top: menu.y }}
        >
          <li onClick={handleAddToLibrary} className="px-4 py-2.5 cursor-pointer hover:bg-[#ffd3da]">
            Add to library
          </li>
          <li onClick={handleReportClick} className="px-4 py-2.5 cursor-pointer hover:bg-[#ffd3da] border-t border-gray-100">
            Report
          </li>
        </ul>
      )}

      <ReasonModal
        open={Boolean(reportTrackId)}
        title="Why are you reporting this track?"
        placeholder="e.g. inappropriate content, copyright..."
        confirmLabel="Report"
        onConfirm={handleReportConfirm}
        onCancel={() => setReportTrackId(null)}
      />
    </>
  );
}
