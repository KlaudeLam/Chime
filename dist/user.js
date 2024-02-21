import { changeBtnStatus } from './common.js';
import {  
    getDoc, doc,
    updateDoc, arrayRemove} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';
import { firestore } from './firebase-config.js';

// ARTIST/USER PAGE-BODY DISPLAY-------------------------------
const isArtist = localStorage.getItem("isArtist");
const pageBody = document.getElementById("page-body");
const userHeaderInfo = document.getElementById("user-header-info");
const usernameDisplay = document.getElementById("user-header-username");
const username = localStorage.getItem("username");

usernameDisplay.innerHTML = `${username}`;

const displayNothing = (categoryID) => {
    document.getElementById(categoryID).innerHTML = `
        <div class="flex flex-col justify-center items-center gap-[24px]">
            <img class="w-1/3 max-sm:w-1/2" src="./img/empty-box.png">
            <div>It's empty. Let's explore more on Chime!</div>
        </div>
    `
}

if (isArtist == "false") {
    // change button to "Add playlist"
    userHeaderInfo.insertAdjacentHTML("beforeend", `<button id="btn-edit-account" class="block rounded-full bg-bittersweet hover:bg-darkbitterswwet font-semibold text-sm text-white w-fit mt-2 px-4 py-2">Edit account</button>`);
    // show saved tracks
    pageBody.innerHTML = `
    <div class="flex gap-2 mb-5">
        <button id="btn-your-tracks" class="w-fit rounded-3xl bg-bittersweet text-white py-2 px-4 text-sm">Playlists</button>
        <button id="btn-your-episodes" class="w-fit rounded-3xl bg-[#ffd3da] text-black py-2 px-4 text-sm">Episodes</button>
        <button id="btn-your-artists" class="w-fit rounded-3xl bg-[#ffd3da] text-black py-2 px-4 text-sm">Artists</button>
    </div>
    <div id="your-tracks" class="category">
        <div class="category-title">Your tracks</div>
        <div id="your-tracks-content" class="category-carousel flex gap-2"></div>
        <div class="pagination w-full flex justify-center items-center gap-4 mt-7">
            <button
                class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                aria-hidden="true" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
            </button>
            <div class="flex items-center gap-2">
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    1
                </span>
                </button>
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    2
                </span>
                </button>
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    3
                </span>
                </button>
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    4
                </span>
                </button>
                <button
                class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    5
                </span>
                </button>
            </div>
            <button
                class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                aria-hidden="true" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
            </button>
        </div> 
    </div>
    <div id="your-episodes" class="category hidden">
        <div class="category-title">Your episodes</div>
        <div id="your-episodes-content" class="category-carousel flex gap-2">
            <a href="#">
                <div class="category-content">
                    <img src="https://i.scdn.co/image/ab67656300005f1f826551d2120669d33f365fcd" alt="">
                    <div class="category-content-name">Ego and Meditation</div>
                    <a href="BTS" class="category-content-description">45 mins</a>
                </div>
            </a>
        </div>
    </div>
    <div id="your-artists" class="category hidden">
        <div class="category-title">Your fav artists</div>
        <div id="your-artists-content" class="category-carousel flex gap-2">
            <a class="category-content-artist" href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Vu_monsoon2019.jpg/1200px-Vu_monsoon2019.jpg" alt="">
                <div class="category-content-artist-name">Vũ.</div>
            </a>
        </div>
    </div>
    `

    // TOP PAGE BUTTONS-------------------------------------
    document.getElementById("btn-your-tracks").onclick = () => {
        changeBtnStatus("btn-your-tracks", "#ff6176", "#ffffff");
        changeBtnStatus("btn-your-episodes", "#ffd3da", "black");
        changeBtnStatus("btn-your-artists", "#ffd3da", "black");

        document.getElementById('your-tracks').style.display = "block";
        document.getElementById('your-episodes').style.display = "none";
        document.getElementById('your-artists').style.display = "none";
    }

    document.getElementById("btn-your-episodes").onclick = () => {
        changeBtnStatus("btn-your-episodes", "#ff6176", "#ffffff");
        changeBtnStatus("btn-your-tracks", "#ffd3da", "black");
        changeBtnStatus("btn-your-artists", "#ffd3da", "black");

        document.getElementById('your-episodes').style.display = "block";
        document.getElementById('your-tracks').style.display = "none";
        document.getElementById('your-artists').style.display = "none";
    }

    document.getElementById("btn-your-artists").onclick = () => {
        changeBtnStatus("btn-your-artists", "#ff6176", "#ffffff");
        changeBtnStatus("btn-your-episodes", "#ffd3da", "black");
        changeBtnStatus("btn-your-tracks", "#ffd3da", "black");

        document.getElementById('your-artists').style.display = "block";
        document.getElementById('your-episodes').style.display = "none";
        document.getElementById('your-tracks').style.display = "none";
    }

    // DISPLAY TRACKS----------------------------
    const yourTracksContent = document.getElementById("your-tracks-content");
    const playlistRef = doc(firestore, "user-playlists", username);

    const snapshot = await getDoc(playlistRef);
   
    // Check if doc exists
    if (snapshot.exists()) {
        const songIDs = snapshot.data().songIDs;

        // If doc has no keys / doc has "songIDs" key but it's an empty array: display nothing
        if (Object.keys(snapshot.data()).length == 0 || (songIDs && songIDs.length == 0)) {
            displayNothing("your-tracks");

        } else {
            songIDs.forEach(async (id) => {
                const songRef = doc(firestore, "songs", id);
                const songSnapshot = await getDoc(songRef);
                const data = songSnapshot.data();

                yourTracksContent.insertAdjacentHTML("beforeend", `
                    <div id='${id}' class="category-content relative">
                    
                        <img src="${data.thumbnail}" alt="">
                        <div class="category-content-name">${data.title}</div>
                        <a class="category-content-description">${data.artist}</a>

                        <span id='del-${id}' class="absolute top-0 right-0 cursor-pointer -translate-y-1/2  rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 122.88 122.879" enable-background="new 0 0 122.88 122.879" xml:space="preserve">
                            <title>Delete track</title>
                            <g><path fill="#ff3f5f" d="M61.44,0c16.96,0,32.328,6.882,43.453,17.986c11.104,11.125,17.986,26.494,17.986,43.453 c0,16.961-6.883,32.328-17.986,43.453C93.769,115.998,78.4,122.879,61.44,122.879c-16.96,0-32.329-6.881-43.454-17.986 C6.882,93.768,0,78.4,0,61.439C0,44.48,6.882,29.111,17.986,17.986C29.112,6.882,44.48,0,61.44,0L61.44,0z M73.452,39.152 c2.75-2.792,7.221-2.805,9.986-0.026c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.077,12.25 c2.728,2.77,2.689,7.256-0.081,10.021c-2.772,2.766-7.229,2.758-9.954-0.012L61.445,71.541L49.428,83.729 c-2.75,2.793-7.22,2.805-9.985,0.025c-2.763-2.775-2.776-7.291-0.026-10.082L51.48,61.435l-12.078-12.25 c-2.726-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.954,0.013L61.435,51.34L73.452,39.152L73.452,39.152z M96.899,25.98C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685 c-9.073,9.073-14.684,21.609-14.684,35.459s5.611,26.387,14.684,35.459c9.073,9.074,21.609,14.686,35.46,14.686 c13.85,0,26.386-5.611,35.459-14.686c9.073-9.072,14.684-21.609,14.684-35.459S105.973,35.054,96.899,25.98L96.899,25.98z"/></g></svg>
                        </span>
                    </div>
                `);
            });
        }
    } else {
        displayNothing("your-tracks");
    }

    // DELETE BUTTON-------------------------
    setTimeout(() => {
        const btnDels = document.querySelectorAll('[id^="del-"]');
        console.log(btnDels);

        btnDels.forEach(btnDel => {
            btnDel.addEventListener("click", async () => {
                const idDel = btnDel.id.slice(4);
                
                const modal = document.getElementById("modal");
                modal.classList.remove("hidden");

                document.getElementById("btnYes").addEventListener("click", async () => {
                    alert("Delete may take some seconds. Click OK to proceed.");

                    // Delete id in doc's array on Firestore
                    updateDoc(playlistRef, {songIDs: arrayRemove(idDel)})
                        .then(() => {
                            console.log("Done delete from firestore");
                            modal.classList.add("hidden");
                            location.reload();
                        }).catch((error) => {
                            console.log(error);
                            alert("Fail to delete");
                        });
                });

                document.getElementById("btnNo").addEventListener("click", () => {
                    modal.classList.add("hidden");
                });
            });
        });
    }, 2000);
}