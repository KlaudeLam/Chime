import { Link } from 'react-router-dom';
import { usePlayer } from '../contexts/PlayerContext';
import { useAuth } from '../contexts/AuthContext';
import { useTrackContextMenu } from '../contexts/TrackContextMenuContext';

export function TrackCard({ track, queue }) {
  const { playQueue } = usePlayer();
  const { profile } = useAuth();
  const { openMenu } = useTrackContextMenu();

  function handleClick() {
    const list = queue || [track];
    playQueue(list, list.findIndex((t) => t.id === track.id));
  }

  function handleContextMenu(e) {
    if (profile?.is_artist) return;
    openMenu(e, track.id);
  }

  return (
    <div className="category-content" onClick={handleClick} onContextMenu={handleContextMenu}>
      <img src={track.thumbnail_url} alt="" />
      <div className="category-content-name">{track.title}</div>
      <Link
        to={`/artist/${track.artist_id}`}
        onClick={(e) => e.stopPropagation()}
        className="category-content-description hover:underline"
      >
        {track.artist?.username}
      </Link>
    </div>
  );
}
