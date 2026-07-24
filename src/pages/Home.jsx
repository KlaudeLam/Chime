import { useEffect, useState } from 'react';
import { fetchRecentTracks } from '../api/tracks';
import { TrackCard } from '../components/TrackCard';
import { fetchFeaturedAlbums, fetchFeaturedSongs, fetchFeaturedPodcasts, fetchFeaturedArtists } from '../api/itunes';

export function Home() {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchRecentTracks(10).then(setTracks).catch((err) => console.error(err));
    fetchFeaturedAlbums().then(setAlbums).catch((err) => console.error(err));
    fetchFeaturedSongs().then(setSongs).catch((err) => console.error(err));
    fetchFeaturedPodcasts().then(setPodcasts).catch((err) => console.error(err));
    fetchFeaturedArtists().then(setArtists).catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div id="new-release" className="banner-display mb-7">
        <a href="songlink"><img src="https://i.redd.it/qo9vqwuoycca1.jpg" alt="" /></a>
      </div>

      <div id="page-body" className="mb-20 flex flex-col gap-[24px] pl-[30px] py-[8px]">
        <div className="category">
          <div className="category-title">Recently released</div>
          <div className="category-carousel flex gap-2">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} queue={tracks} />
            ))}
          </div>
        </div>

        <div className="category">
          <div className="category-title">Popular albums</div>
          <div className="category-carousel flex gap-2">
            {albums.map((album) => (
              <a key={album.id} href={album.url} target="_blank" rel="noreferrer" className="category-content" title={`${album.title} - ${album.artist}`}>
                <img src={album.thumbnail} alt="" />
                <div className="category-content-name">{album.title}</div>
                <div className="category-content-description">Album - {album.artist}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="category">
          <div className="category-title">Trending songs</div>
          <div className="category-carousel flex gap-2">
            {songs.map((song) => (
              <a key={song.id} href={song.url} target="_blank" rel="noreferrer" className="category-content" title={song.title}>
                <img src={song.thumbnail} alt="" />
                <div className="category-content-name">{song.title}</div>
                <div className="category-content-description">{song.artist}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="category">
          <div className="category-title">Podcasts for you</div>
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

        <div className="category">
          <div className="category-title">Fav artists</div>
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

        <div id="upcoming-event" className="banner-display">
          <a href="songlink">
            <img src="https://phinf.wevpstatic.net/MjAyMjExMTNfMTIg/MDAxNjY4MzIwNjY1MzE1._NqU1ohf8ye8tENAlepfRkbSL5ffDVP--OUqDYRtdC8g.Y5DXfYhapx1mRlcuLb4m2iqjnjSvbA9CpzJ8plTudvIg.PNG/5fd17eb0-f99a-4955-a7ef-5aeb1fd089b0.png" alt="" />
          </a>
        </div>
      </div>
    </>
  );
}
