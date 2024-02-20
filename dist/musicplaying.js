import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import { firestore } from "./firebase-config.js";

const thumbnail = document.querySelectorAll(".player-cover"),
title = document.querySelectorAll('.player-song'),
artist = document.querySelectorAll('.player-artist'),
currentTimeEl = document.querySelectorAll('.current-time'),
durationEl = document.querySelectorAll('.duration'),
playerProgress = document.querySelectorAll('.player-progress'),
progress = document.querySelectorAll('.progress'),
btnPrev = document.getElementById('btn-prev'),
btnNext = document.getElementById('btn-next'),
btnPlay = document.querySelectorAll('.btn-play'),
btnPause = document.querySelectorAll('.btn-pause'),
btnLoop = document.getElementById('btn-loop'),
btnShuffle = document.getElementById('btn-shuffle');

const music = new Audio();
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
    btnPause.forEach(btn => {
        btn.style.display = 'block';
    });
    btnPlay.forEach(btn => {
        btn.style.display = 'none';
    });
    music.play();
}

const pauseMusic = () => {
    isPlaying = false;
    // change play button icon - set button hover title
    btnPause.forEach(btn => {
        btn.style.display = 'none';
    });
    btnPlay.forEach(btn => {
        btn.style.display = 'block';
    });
    music.pause();
}

const loadMusic = (song) => {
    music.src = song.track;
    thumbnail.forEach(ele => {
        ele.src = song.thumbnail;
    });
    title.forEach(ele => {
        ele.textContent = song.title;
    });
    artist.forEach(ele => {
        ele.textContent = song.artist; 
    });
    
}

const changeMusic = (direction) => {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

const updateProgressBar = () => {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.forEach(ele => {
        ele.style.width = `${progressPercent}%`;
    })
    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.forEach(ele => {
        ele.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    });
    currentTimeEl.forEach(ele => {
        ele.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
    });
}

const setProgressBar = (e) => {
    playerProgress.forEach(ele => {
        const width = ele.clientWidth;
        const clickX = e.offsetX;
        music.currentTime = (clickX / width) * music.duration;
    });
}

// CHOOSE MUSIC---------------------------
// Only apply to elements with class contains "category-content"

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    // Waiting 4s for the songs to load from Firestore
    setTimeout(() => {

        const clickable = document.querySelectorAll('.category-content');
        console.log(clickable);

        clickable.forEach(track => {
            track.addEventListener("click", async () => {
                // Get doc's ID
                const id = track.id;
                // Get data from Firestore 
                const snapshot = await getDoc(doc(firestore, "songs", id));
                const data = snapshot.data();
                // Load music, artist, title from data
                loadMusic(data);
                playMusic();
            });
        }); 
    }, 4000);
});

btnPause.forEach(btn => {
    btn.addEventListener('click', togglePlay);
});
btnPlay.forEach(btn => {
    btn.addEventListener('click', togglePlay);
});

// btnPrev.addEventListener('click', () => changeMusic(-1));
// btnNext.addEventListener('click', () => changeMusic(1));

music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);

playerProgress.forEach(ele => {
    ele.addEventListener('click', setProgressBar);
});