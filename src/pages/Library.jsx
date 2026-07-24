import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchTracksByArtist, deleteTrack, deleteTrackFiles, trackAudioPath, trackThumbnailPath } from '../api/tracks';
import { fetchLibraryTracks, removeTrackFromLibrary } from '../api/library';
import { fetchFollowCounts } from '../api/follows';
import { fetchFeaturedPodcasts, fetchFeaturedArtists } from '../api/itunes';
import { usePagination } from '../hooks/usePagination';
import { LibraryTrackCard } from '../components/LibraryTrackCard';
import { Pagination } from '../components/Pagination';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

const TABS = {
  fan: ['Playlists', 'Episodes', 'Artists'],
  artist: ['Tracks', 'Episodes'],
};

function EmptyState() {
  return (
    <div className="flex flex-col justify-center items-center gap-[24px]">
      <img className="w-1/3 max-sm:w-1/2" src="/assets/images/empty-box.png" alt="" />
      <div>It's empty. Let's explore more on Chime!</div>
    </div>
  );
}

export function Library() {
  const { user, profile } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [followCounts, setFollowCounts] = useState({ followers: 0, following: 0 });
  const [podcasts, setPodcasts] = useState([]);
  const [artists, setArtists] = useState([]);

  const isArtist = profile?.is_artist;
  const tabs = isArtist ? TABS.artist : TABS.fan;

  useEffect(() => {
    // profile loads asynchronously after user -- wait for it so isArtist is
    // never fetched against a stale/undefined value (was causing a race
    // where the wrong branch's result could overwrite the correct one).
    if (!user || !profile) return;
    let cancelled = false;
    const load = isArtist ? fetchTracksByArtist(user.id) : fetchLibraryTracks(user.id);
    load
      .then((data) => { if (!cancelled) setTracks(data); })
      .catch((err) => console.error(err))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [user, profile, isArtist]);

  useEffect(() => {
    if (!user) return;
    fetchFollowCounts(user.id).then(setFollowCounts).catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    fetchFeaturedPodcasts().then(setPodcasts).catch((err) => console.error(err));
    fetchFeaturedArtists().then(setArtists).catch((err) => console.error(err));
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(tracks, 5);

  async function handleConfirmDelete() {
    const track = deleteTarget;
    setDeleteTarget(null);
    try {
      if (isArtist) {
        await deleteTrackFiles(trackAudioPath(user.id, track.id), trackThumbnailPath(user.id, track.id));
        await deleteTrack(track.id);
      } else {
        await removeTrackFromLibrary(user.id, track.id);
      }
      setTracks((prev) => prev.filter((t) => t.id !== track.id));
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  }

  return (
    <>
      <div id="user-header" className="w-full bg-white">
        <img className="h-[250px] overflow-hidden object-cover object-top w-full" src="https://images5.alphacoders.com/132/1327980.png" alt="" />
        <div className="flex justify-between w-full h-30 p-3 pb-5 gap-3 border-b">
          <img className="w-[18%] min-w-[18%] -mt-[9%] h-fit aspect-square border-4 border-white rounded-full overflow-hidden object-cover object-center" src="https://favim.com/pd/s13/orig/170502/asian-girl-fashion-grunge-korean-boy-Favim.com-5175863.jpeg" alt="" />
          <div className="flex flex-col justify-end w-[79%] text-left">
            <p className="font-semibold w-fit">{profile?.username}</p>
            <div>
              <span className="text-gray-500">{followCounts.followers} followers</span>
              <span> • </span>
              <span className="text-gray-500">{followCounts.following} following</span>
            </div>
            {isArtist ? (
              <Link to="/publish" className="w-fit">
                <button className="block rounded-full bg-bittersweet hover:bg-darkbittersweet hover:font-semibold text-sm text-white w-fit mt-2 px-4 py-2">Publish</button>
              </Link>
            ) : (
              <button className="block rounded-full bg-bittersweet hover:bg-darkbittersweet hover:font-semibold text-sm text-white w-fit mt-2 px-4 py-2">Edit account</button>
            )}
          </div>
        </div>
      </div>

      <div id="page-body" className="mb-20 flex flex-col gap-[24px] px-[30px] py-5">
        <div className="flex gap-2 mb-5">
          {tabs.map((label, i) => (
            <button
              key={label}
              onClick={() => setActiveTab(i)}
              className="w-fit rounded-3xl py-2 px-4 text-sm"
              style={{ backgroundColor: activeTab === i ? '#ff6176' : '#ffd3da', color: activeTab === i ? 'white' : 'black' }}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <div className="category">
            <div className="category-title">Your {isArtist ? 'tracks' : 'saved tracks'}</div>
            {!loading && tracks.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="category-carousel flex flex-wrap gap-[5%] gap-y-9 justify-start">
                  {pageItems.map((track) => (
                    <LibraryTrackCard
                      key={track.id}
                      track={track}
                      queue={tracks}
                      onDelete={() => setDeleteTarget(track)}
                    />
                  ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              </>
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div className="category">
            <div className="category-title">Your episodes</div>
            <div className="category-carousel flex gap-2">
              {podcasts.map((podcast) => (
                <a key={podcast.id} href={podcast.url} target="_blank" rel="noreferrer" className="category-content" title={podcast.title}>
                  <img src={podcast.thumbnail} alt="" />
                  <div className="category-content-name">{podcast.title}</div>
                  <div className="category-content-description">{podcast.artist}</div>
                </a>
              ))}
            </div>
          </div>
        )}

        {!isArtist && activeTab === 2 && (
          <div className="category">
            <div className="category-title">Your fav artists</div>
            <div className="category-carousel flex gap-2">
              {artists.map((artist) => (
                <a key={artist.id} href={artist.url} target="_blank" rel="noreferrer" className="category-content-artist" title={artist.artist}>
                  <img src={artist.thumbnail} alt="" />
                  <div className="category-content-name">{artist.artist}</div>
                  <div className="category-content-description">{artist.genre}</div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal open={Boolean(deleteTarget)} onConfirm={handleConfirmDelete} onCancel={() => setDeleteTarget(null)} />
    </>
  );
}
