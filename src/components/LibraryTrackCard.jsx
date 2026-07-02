import { usePlayer } from '../contexts/PlayerContext';
import { DeleteIcon } from './icons';

export function LibraryTrackCard({ track, queue, onDelete }) {
  const { playQueue } = usePlayer();

  function handleClick() {
    playQueue(queue, queue.findIndex((t) => t.id === track.id));
  }

  return (
    <div className="category-content relative" title={`${track.title} - ${track.artist?.username || ''}`}>
      <img src={track.thumbnail_url} alt="" onClick={handleClick} className="cursor-pointer" />
      <div className="category-content-name" onClick={handleClick}>{track.title}</div>
      <a className="category-content-description" onClick={handleClick}>{track.artist?.username}</a>
      <span onClick={onDelete} className="absolute top-0 right-0 cursor-pointer -translate-y-1/2 z-30 rounded-full">
        <DeleteIcon />
      </span>
    </div>
  );
}
