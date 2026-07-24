import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchUserProfile } from '../api/users';
import { fetchTracksByArtist } from '../api/tracks';
import { fetchFollowCounts, isFollowing, followUser, unfollowUser } from '../api/follows';
import { TrackCard } from '../components/TrackCard';

export function ArtistProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [followCounts, setFollowCounts] = useState({ followers: 0, following: 0 });
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = user?.id === id;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetchUserProfile(id),
      fetchTracksByArtist(id),
      fetchFollowCounts(id),
      user && !isOwnProfile ? isFollowing(user.id, id) : Promise.resolve(false),
    ])
      .then(([artistData, tracksData, counts, followingStatus]) => {
        if (cancelled) return;
        setArtist(artistData);
        setTracks(tracksData);
        setFollowCounts(counts);
        setFollowing(followingStatus);
      })
      .catch((err) => console.error(err))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, user, isOwnProfile]);

  async function handleToggleFollow() {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      if (following) {
        await unfollowUser(user.id, id);
        setFollowing(false);
        setFollowCounts((c) => ({ ...c, followers: c.followers - 1 }));
      } else {
        await followUser(user.id, id);
        setFollowing(true);
        setFollowCounts((c) => ({ ...c, followers: c.followers + 1 }));
      }
    } catch (err) {
      alert(`Failed to update follow status: ${err.message}`);
    }
  }

  if (loading) return null;
  if (!artist) return <div id="page-body" className="px-[30px] py-5">User not found.</div>;

  return (
    <>
      <div id="user-header" className="w-full bg-white">
        <img className="h-[250px] overflow-hidden object-cover object-top w-full" src="https://images5.alphacoders.com/132/1327980.png" alt="" />
        <div className="flex justify-between w-full h-30 p-3 pb-5 gap-3 border-b">
          <img className="w-[18%] min-w-[18%] -mt-[9%] h-fit aspect-square border-4 border-white rounded-full overflow-hidden object-cover object-center" src="https://favim.com/pd/s13/orig/170502/asian-girl-fashion-grunge-korean-boy-Favim.com-5175863.jpeg" alt="" />
          <div className="flex flex-col justify-end w-[79%] text-left">
            <p className="font-semibold w-fit">{artist.username}</p>
            <div>
              <span className="text-gray-500">{followCounts.followers} followers</span>
              <span> • </span>
              <span className="text-gray-500">{followCounts.following} following</span>
            </div>
            {!isOwnProfile && (
              <button
                onClick={handleToggleFollow}
                className="block rounded-full hover:font-semibold text-sm w-fit mt-2 px-4 py-2"
                style={following ? { backgroundColor: '#ffd3da', color: 'black' } : { backgroundColor: '#ff6176', color: 'white' }}
              >
                {following ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div id="page-body" className="mb-20 flex flex-col gap-[24px] px-[30px] py-5">
        <div className="category">
          <div className="category-title">{artist.is_artist ? 'Tracks' : 'Saved tracks'}</div>
          {tracks.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-[24px]">
              <img className="w-1/3 max-sm:w-1/2" src="/assets/images/empty-box.png" alt="" />
              <div>Nothing here yet.</div>
            </div>
          ) : (
            <div className="category-carousel flex flex-wrap gap-[5%] gap-y-9 justify-start">
              {tracks.map((track) => (
                <TrackCard key={track.id} track={track} queue={tracks} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
