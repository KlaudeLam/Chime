import { useEffect, useState } from 'react';
import { fetchRecentTracks } from '../api/tracks';
import { TrackCard } from '../components/TrackCard';
import { demoAlbums, demoPlaylists, demoEpisodes, demoArtists } from '../data/demoContent';

export function Home() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchRecentTracks(10).then(setTracks).catch((err) => console.error(err));
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
            {demoAlbums.map((album) => (
              <div key={album.title} className="category-content" title={`${album.title} - ${album.artist}`}>
                <img src={album.thumbnail} alt="" />
                <div className="category-content-name">{album.title}</div>
                <a href="BTS" className="category-content-description">Album - {album.artist}</a>
              </div>
            ))}
          </div>
        </div>

        <div className="category">
          <div className="category-title">Playlists</div>
          <div className="category-carousel flex gap-2">
            {demoPlaylists.map((playlist) => (
              <div key={playlist.title} className="category-content" title={playlist.title}>
                <img src={playlist.thumbnail} alt="" />
                <div className="category-content-name">{playlist.title}</div>
                <a href="" className="category-content-description">{playlist.duration}</a>
              </div>
            ))}
          </div>
        </div>

        <div className="category">
          <div className="category-title">Episodes for you</div>
          <div className="category-carousel flex gap-2">
            {demoEpisodes.map((episode) => (
              <div key={episode.title} className="category-content" title={episode.title}>
                <img src={episode.thumbnail} alt="" />
                <div className="category-content-name">{episode.title}</div>
                <a href="" className="category-content-description">{episode.duration}</a>
              </div>
            ))}
          </div>
        </div>

        <div className="category">
          <div className="category-title">Fav artists</div>
          <div className="category-carousel flex gap-2">
            {demoArtists.map((artist) => (
              <div key={artist.artist} className="category-content-artist" title={artist.artist}>
                <img src={artist.thumbnail} alt="" />
                <div className="category-content-name">{artist.artist}</div>
                <a href="" className="category-content-description">{artist.role}</a>
              </div>
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
