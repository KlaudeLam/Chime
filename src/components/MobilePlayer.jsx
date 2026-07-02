import { usePlayer } from '../contexts/PlayerContext';
import { ShuffleIcon, PrevIcon, PlayIcon, PauseIcon, NextIcon, LoopIcon } from './icons';

function formatTime(time) {
  if (!Number.isFinite(time)) return '00:00';
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(Math.floor(time % 60)).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function MobilePlayer() {
  const { currentTrack, isPlaying, currentTime, duration, togglePlay, prev, next, seek } = usePlayer();
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  function handleSeek(e) {
    const width = e.currentTarget.clientWidth;
    seek((e.nativeEvent.offsetX / width) * duration);
  }

  return (
    <div id="bottom-bar" className="fixed bottom-0 z-40 w-full h-[64px] flex items-center justify-between py-2 px-2 lg:hidden">
      <div className="h-full flex items-center gap-3 w-1/5">
        <img
          className="h-full aspect-square rounded-[6%]"
          src={currentTrack?.thumbnail_url || 'https://img.freepik.com/premium-vector/diagonal-cross-line-grid-square-seamless-pattern_80590-13921.jpg'}
          alt=""
        />
        <div className="w-2/3">
          <div className="w-full category-content-name">{currentTrack?.title || 'Not playing'}</div>
          <div className="w-full category-content-description">{currentTrack?.artist?.username || ''}</div>
        </div>
      </div>
      <div onClick={handleSeek} className="hidden md:block md:w-1/2 bg-white rounded-sm cursor-pointer h-1">
        <div className="bg-lightbittersweet rounded-sm h-full transition-[width] duration-[0.01s] ease-linear" style={{ width: `${progressPercent}%` }} />
        <div className="music-duration w-full flex justify-between text-xs text-white">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-fit justify-self-end flex items-center gap-[6px]">
        <ShuffleIcon stroke="#ffffff" />
        <span onClick={prev}><PrevIcon stroke="#ffffff" /></span>
        <span onClick={togglePlay}>{isPlaying ? <PauseIcon stroke="#ffffff" /> : <PlayIcon stroke="#ffffff" />}</span>
        <span onClick={next}><NextIcon stroke="#ffffff" /></span>
        <LoopIcon stroke="#ffffff" />
      </div>
    </div>
  );
}
