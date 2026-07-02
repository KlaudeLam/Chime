import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTrackContextMenu } from '../contexts/TrackContextMenuContext';
import { addTrackToLibrary, isTrackInLibrary } from '../api/library';

export function TrackContextMenu() {
  const { user } = useAuth();
  const { menu, closeMenu } = useTrackContextMenu();

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

  if (!menu) return null;

  return (
    <ul
      className="fixed cursor-pointer bg-bittersweet text-white text-sm rounded-full w-fit p-2"
      style={{ left: menu.x, top: menu.y }}
    >
      <li onClick={handleAddToLibrary}>Add to library</li>
    </ul>
  );
}
