// Thin wrapper around Apple's free, keyless iTunes Search API
// (https://itunes.apple.com/search). There's no "charts" endpoint on this
// API -- it's search-only -- so "featured" rows are built by querying a
// curated list of well-known artists and taking their top match. Results
// are real catalog data (artwork, names, preview clips), just not a live
// chart.

const SEARCH_URL = 'https://itunes.apple.com/search';

const FEATURED_ARTISTS = [
  'Taylor Swift', 'The Weeknd', 'Billie Eilish', 'Bruno Mars', 'Dua Lipa', 'Kendrick Lamar',
];

function upscaleArtwork(url) {
  return url?.replace('100x100bb', '400x400bb');
}

async function searchOnce(term, entity) {
  const url = `${SEARCH_URL}?term=${encodeURIComponent(term)}&entity=${entity}&limit=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes search failed: ${res.status}`);
  const data = await res.json();
  return data.results?.[0] ?? null;
}

// The unkeyed endpoint occasionally drops one connection out of a parallel
// batch to the same host ("Failed to fetch" with no HTTP status) -- one retry
// clears it almost every time.
async function searchOne(term, entity) {
  try {
    return await searchOnce(term, entity);
  } catch {
    return await searchOnce(term, entity);
  }
}

async function loadFeatured(entity, mapResult) {
  const settled = await Promise.allSettled(FEATURED_ARTISTS.map((artist) => searchOne(artist, entity)));
  return settled
    .filter((s) => s.status === 'fulfilled' && s.value)
    .map((s) => mapResult(s.value));
}

function loadAlbums() {
  return loadFeatured('album', (r) => ({
    id: r.collectionId,
    title: r.collectionName,
    artist: r.artistName,
    genre: r.primaryGenreName,
    thumbnail: upscaleArtwork(r.artworkUrl100),
    url: r.collectionViewUrl,
  }));
}

function loadSongs() {
  return loadFeatured('song', (r) => ({
    id: r.trackId,
    title: r.trackName,
    artist: r.artistName,
    thumbnail: upscaleArtwork(r.artworkUrl100),
    previewUrl: r.previewUrl,
    url: r.trackViewUrl,
  }));
}

async function loadPodcasts(limit) {
  const url = `${SEARCH_URL}?term=podcast&entity=podcast&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes search failed: ${res.status}`);
  const data = await res.json();
  return (data.results ?? []).map((r) => ({
    id: r.collectionId,
    title: r.collectionName,
    artist: r.artistName,
    thumbnail: upscaleArtwork(r.artworkUrl100),
    url: r.collectionViewUrl,
  }));
}

// Cache the in-flight promise itself (not just the resolved value) so
// concurrent callers -- e.g. fetchFeaturedArtists() calling
// fetchFeaturedAlbums() in the same render tick as Home's own call -- share
// one network batch instead of each kicking off their own duplicate set of
// requests. That duplication was tripping iTunes' unkeyed rate limit.
let albumsPromise = null;
let songsPromise = null;
let podcastsPromise = null;

export function fetchFeaturedAlbums(limit = 6) {
  if (!albumsPromise) albumsPromise = loadAlbums();
  return albumsPromise.then((albums) => albums.slice(0, limit));
}

export function fetchFeaturedSongs(limit = 6) {
  if (!songsPromise) songsPromise = loadSongs();
  return songsPromise.then((songs) => songs.slice(0, limit));
}

export async function fetchFeaturedArtists(limit = 6) {
  const albums = await fetchFeaturedAlbums(FEATURED_ARTISTS.length);
  const seen = new Set();
  const artists = albums.filter((a) => {
    if (seen.has(a.artist)) return false;
    seen.add(a.artist);
    return true;
  });
  return artists.slice(0, limit);
}

export function fetchFeaturedPodcasts(limit = 6) {
  if (!podcastsPromise) podcastsPromise = loadPodcasts(limit);
  return podcastsPromise;
}
