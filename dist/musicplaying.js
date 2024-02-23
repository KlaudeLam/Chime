import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

// MUSIC PLAYING FUNCTIONS------------------------ 
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
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;

    // Bottom bar: Click in the same spot - Why does the width change?
    console.log(clickX);
    console.log(width);
    console.log(clickX/width);
    console.log((clickX / width) * music.duration);

    music.currentTime = (clickX / width) * music.duration;
}

// CONTEXT MENU FUNCTIONS-------------------
const contextMenu = document.getElementById("context-menu");
const addToLibrary = document.getElementById("add-to-library");
const isArtist = localStorage.getItem("isArtist");

const showContextMenu = (e) => {
    e.preventDefault();

    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;

    if (!contextMenu.classList.contains("fixed")) {
        contextMenu.classList.add("fixed");
    }

    if (contextMenu.classList.contains("hidden")) {
        contextMenu.classList.remove("hidden");
    }
}

const closeContextMenu = () => {
    contextMenu.classList.add("hidden");
    contextMenu.classList.remove("fixed");
}

// CHOOSE, PLAY, ADD MUSIC TO LIBRARY (For user) ---------------------------
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    // Waiting 4s for the songs to load from Firestore
    setTimeout(() => {
        // Only apply to elements with class contains "category-content"
        const clickable = document.querySelectorAll('.category-content');
        console.log(clickable);

        clickable.forEach(track => {
            // LOAD, PLAY MUSIC
            track.addEventListener("click", async () => {
                // Get doc's ID
                const id = track.id;
                // Get data from Firestore 
                const snapshot = await getDoc(doc(firestore, "songs", id));
                const data = snapshot.data();

                loadMusic(data);
                playMusic();
            });
            
            // (User only) ADD MUSIC TO LIBRARY
            if (isArtist == "false") {
                // Right click: Open context menu
                track.addEventListener("contextmenu", (e) => {
                    showContextMenu(e);
                    console.log(track.id);
                    
                    addToLibrary.onclick = async () => {
                        closeContextMenu();
                        const id = track.id;

                        // Firestore: Check if doc exist
                        const username = localStorage.getItem("username");
                        const addRef = doc(firestore, "user-playlists", username);
                        const addSnapshot = await getDoc(addRef);
                        
                        if (addSnapshot.exists()) {
                        // Doc: Check if song is already added
                            const songIDs = addSnapshot.data().songIDs;
                            console.log(id);

                            if (songIDs.includes(id)) {
                                alert("This track is already added.");
                            } else {
                                await updateDoc(addRef, {songIDs: arrayUnion(id)});
                                alert("Track added successfully");
                            } 
                        } else {
                            await setDoc(addRef, {songIDs: []});
                            await updateDoc(addRef, {songIDs: arrayUnion(id)});
                            alert("Playlist created and track added successfully");
                        }
                    }
                });

                // Click outside menu: Close menu
                document.addEventListener("click", (e) => {
                    if (!contextMenu.contains(e.target)) closeContextMenu();
                });
            }  
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