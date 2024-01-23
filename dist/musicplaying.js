const thumbnail = document.getElementById("player-cover"),
title = document.getElementById('player-song'),
artist = document.getElementById('player-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
playerProgress = document.getElementById('player-progress'),
progress = document.getElementById('progress'),
btnPrev = document.getElementById('btn-prev'),
btnNext = document.getElementById('btn-next'),
btnPlay = document.getElementById('btn-play'),
btnPause = document.getElementById('btn-pause'),
btnLoop = document.getElementById('btn-loop'),
btnShuffle = document.getElementById('btn-shuffle');

const music = new Audio();
const songs = [
    {
        path: 'testmp3/Hizamazuke Butadomo Ga_No Name (Levi, Hange, Miike)_-5913017.mp3',
        songName: 'Hizamazuke',
        cover: 'img/bts slick poster.jpg',
        artist: 'artist 1',
    },
    {
        path: 'testmp3/Mahoutsukai no Yome OP-Opening Full 「Here - JUNNA」- Cover by Kami (192  kbps) (imp3juices.com).mp3',
        songName: 'Mahoutsukai',
        cover: 'img/le sserafim poster.jpg',
        artist: 'artist 2',
    },
    {
        path: 'testmp3/Shelter Porter Robinson_Porter Robinson_-6288842.mp3',
        songName: 'Shelter',
        cover: 'img/chime-logo.jpg',
        artist: 'artist 3',
    },
];

let musicIndex = 0;
let isPlaying = false;

const togglePlay = () => {
    if(isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

const playMusic = () => {
    isPlaying = true;
    // change play button icon - set button hover title
    btnPause.style.display = 'block';
    btnPlay.style.display = 'none';
    music.play();
}

const pauseMusic = () => {
    isPlaying = false;
    // change play button icon - set button hover title
    btnPause.style.display = 'none';
    btnPlay.style.display = 'block';
    music.pause();
}

const loadMusic = (song) => {
    music.src = song.path;
    title.textContent = song.songName;
    artist.textContent = song.artist;
    thumbnail.src = song.cover;
}

const changeMusic = (direction) => {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

const updateProgressBar = () => {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

const setProgressBar = (e) => {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

btnPlay.addEventListener('click', togglePlay);
btnPause.addEventListener('click', togglePlay);
btnPrev.addEventListener('click', () => changeMusic(-1));
btnNext.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
// chua tua dc nhac
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);