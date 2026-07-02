import { usePlayer } from '../contexts/PlayerContext';
import { ShuffleIcon, PrevIcon, PlayIcon, PauseIcon, NextIcon, LoopIcon } from './icons';

function formatTime(time) {
  if (!Number.isFinite(time)) return '00:00';
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(Math.floor(time % 60)).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function DesktopPlayer() {
  const { currentTrack, isPlaying, currentTime, duration, togglePlay, prev, next, seek } = usePlayer();
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  function handleSeek(e) {
    const width = e.currentTarget.clientWidth;
    seek((e.nativeEvent.offsetX / width) * duration);
  }

  return (
    <div id="music-player" className="music-player">
      <div className="mb-4">
        <img
          className="rounded-[6%] mb-[16px] object-cover w-full aspect-square"
          src={currentTrack?.thumbnail_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR152EC4L2BOKRIx5y2mUbFaslRtFdQ9St9w8hGNfeQww&s'}
          alt=""
        />
        <div className="font-semibold leading-[1.5em] whitespace-nowrap text-ellipsis overflow-hidden">
          {currentTrack?.title || 'Not playing'}
        </div>
        <div className="w-fit cursor-pointer text-sm block whitespace-nowrap text-ellipsis overflow-hidden hover:underline">
          {currentTrack?.artist?.username || ''}
        </div>
      </div>
      <div onClick={handleSeek} className="w-full bg-lightbittersweet rounded-sm cursor-pointer h-1 mt-2 mb-6">
        <div className="bg-bittersweet rounded-sm h-full transition-[width] duration-[0.01s] ease-linear" style={{ width: `${progressPercent}%` }} />
        <div className="music-duration w-full flex justify-between text-xs">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="player-controls flex flex-wrap w-full justify-between">
        <ShuffleIcon />
        <span onClick={prev}><PrevIcon /></span>
        <span onClick={togglePlay}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
        <span onClick={next}><NextIcon /></span>
        <LoopIcon />
      </div>
    </div>
  );
}
