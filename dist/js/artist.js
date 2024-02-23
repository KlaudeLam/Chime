import { firestore, storage, changeBtnStatus } from "./firebase-config.js";
import { collection, query, where, getDocs, getDoc, orderBy, 
    deleteDoc, doc, updateDoc, arrayRemove 
} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';
import { ref, deleteObject } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js';


// ARTIST/USER PAGE-BODY DISPLAY-------------------------------
const isArtist = localStorage.getItem("isArtist");
const pageBody = document.getElementById("page-body");
const userHeaderInfo = document.getElementById("user-header-info");
const usernameDisplay = document.getElementById("user-header-username");
const username = localStorage.getItem("username");

usernameDisplay.innerHTML = `${username}`;

// Firestore info
const colRef = collection(firestore, "songs");
const querySnapshot = await getDocs(query(colRef, where("artist", "==", username)));
const totalItems = querySnapshot.size;

// Function to alert when nothing is found
const displayNothing = (categoryID) => {
    document.getElementById(categoryID).innerHTML = `
        <div class="flex flex-col justify-center items-center gap-[24px]">
            <img class="w-1/3 max-sm:w-1/2" src="/assets/images/empty-box.png">
            <div>It's empty. Let's explore more on Chime!</div>
        </div>
    `
}

// PAGINATION--------------------------------------
const itemsPerPage = 5; // Number of items per page
let currentPage;

// Function to display data for the current page
const displayData = async (page) => {
    // Display track onto page
    const yourTracksContent = document.getElementById("your-tracks-content");
    yourTracksContent.innerHTML = "";

    // Identify which songs appear in the page
    const startIndex = (page - 1) * itemsPerPage;

    const snapshot = await getDocs(query(colRef, where("artist", "==", username), orderBy("date", "desc")));

    const indexLimit = startIndex + itemsPerPage;
    if (indexLimit <= snapshot.size) {
        for (let i = startIndex; i < indexLimit; i++){
            const data = snapshot.docs[i].data();
            const id = snapshot.docs[i].id;
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
            `)
        }
    } else {
        for (let i = startIndex; i < snapshot.size; i++){
            const data = snapshot.docs[i].data();
            const id = snapshot.docs[i].id;
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
            `)
        }
    }
    
    setDeleteBtns();
}

// Function to generate pagination buttons
const generatePaginationButtons = (totalPages) => {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        // Create number buttons
        const buttonHTML = `
            <button id=${i} class="pagination-buttons relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle text-xs font-medium uppercase text-gray-900 transition-all active:bg-gray-900/20"
            type="button">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">${i}</span>
            </button>
        `;
        paginationContainer.insertAdjacentHTML("beforeend", buttonHTML);

        const button = document.getElementById(`${i}`);

        // Style current button
        stylingPaginationButton();

        // Button onclick: change page, restyle
        button.addEventListener('click', () => {
            currentPage = i;
            displayData(currentPage);
            stylingPaginationButton();
        });
    }                               
}

// Function to style pagination buttons
const stylingPaginationButton = () => {
    const paginationBtns = document.querySelectorAll('.pagination-buttons');

    paginationBtns.forEach(btn => {
        const i = btn.id;
        if (i == currentPage) {
            btn.style.backgroundColor = "#ff6176";
            btn.style.color = "white";
        } else {
            btn.style.backgroundColor = "#ffd3da";
            btn.style.color = "black";
        }
    });
}

// DELETE BUTTONS----------------------------
// Function to set up delete buttons and delete song
const setDeleteBtns = () => {
    setTimeout(() => {
        const btnDels = document.querySelectorAll('[id^="del-"]');
        console.log(btnDels);

        btnDels.forEach(btnDel => {
            btnDel.addEventListener("click", async () => {
                const idDel = btnDel.id.slice(4);
                const snapshot = await getDoc(doc(firestore, "songs", idDel));
                const data = snapshot.data();
                
                const modal = document.getElementById("modal");
                modal.classList.remove("hidden");

                document.getElementById("btnYes").addEventListener("click", async () => {
                    alert("Delete may take some seconds. Click OK to proceed.");

                    // Tạo một mảng các promises cho việc tải lên track và thumbnail
                    const allPromises = [];

                    // Delete doc on Firestore
                    await deleteDoc(doc(firestore, "songs", idDel));
                    console.log("done delete from firestore");

                    // Delete ID from every user-playlist
                    const deleteIdFromPlaylist = new Promise ((resolve, reject) => {
                       getDocs(query(collection(firestore, "user-playlists"), where("songIDs", "array-contains", idDel)))
                            .then(userPlaylistsSnapshot => {
                                userPlaylistsSnapshot.forEach((ele) => {
                                    updateDoc(doc(firestore, "user-playlists", ele.id), {songIDs: arrayRemove(idDel)})
                                        .catch(error => {
                                            console.log(error);
                                            reject();
                                        });
                                });
                                console.log("Delete from user playlists successfully");
                                resolve();
                            }).catch(error => {
                                console.log(error);
                                reject();
                            });
                    });
                    allPromises.push(deleteIdFromPlaylist);

                    // Promise: Delete track on Storage
                    const deleteTrackPromise = new Promise((resolve, reject) => {
                        const trackRef = ref(storage, `audio/${data.title} - ${data.artist}.mp3`);

                        deleteObject(trackRef).then(() => {
                            console.log("Track deleted successfully");
                            resolve();
                        }).catch((error) => {
                            console.log(error);
                            reject(error);
                        });
                    });

                    allPromises.push(deleteTrackPromise);

                    // Promise: Delete thumbnail on Storage
                    const deleteThumbnailPromise = new Promise((resolve, reject) => {
                        const thumbnailRef = ref(storage, `thumbnail/${data.title} - ${data.artist}.jpg`);

                        deleteObject(thumbnailRef).then(() => {
                            console.log("Thumbnail deleted successfully");
                            resolve();
                        }).catch((error) => {
                            console.log(error);
                            reject(error);
                        });
                    });

                    allPromises.push(deleteThumbnailPromise);

                    // If all promise resolve: close modal and reload page
                    Promise.all(allPromises)
                    .then(() => {
                        modal.classList.add("hidden");
                        location.reload();
                    });
                });

                document.getElementById("btnNo").addEventListener("click", () => {
                    modal.classList.add("hidden");
                });  
            })
        });
    }, 2000);
}

if (isArtist == "true") {
    // change button to "publish"
    userHeaderInfo.insertAdjacentHTML("beforeend", `<a href="publish.html" class="w-fit"><button id="btn-publish" class="block rounded-full bg-bittersweet hover:bg-darkbitterswwet hover:font-semibold text-sm text-white w-fit mt-2 px-4 py-2">Publish</button></a>`);
    // show published tracks
    pageBody.innerHTML = `
    <div class="flex gap-2 mb-5">
        <button id="btn-your-tracks" class="w-fit rounded-3xl bg-bittersweet text-white py-2 px-4 text-sm">Tracks</button>
        <button id="btn-your-episodes" class="w-fit rounded-3xl bg-[#ffd3da] text-black py-2 px-4 text-sm">Episodes</button>
    </div>
    <div id="your-tracks" class="category">
        <div class="category-title">Your tracks</div>
        <div id="your-tracks-content" class="category-carousel flex flex-wrap gap-[5%] gap-y-9 justify-start"></div>
        <div id="pagination" class="w-full flex justify-center items-center gap-4 mt-7"></div> 
    </div>
    <div id="your-episodes" class="category hidden">
        <div class="category-title">Your episodes</div>
        <a href="#">
                <div class="category-content">
                    <img src="https://i.scdn.co/image/ab67656300005f1f826551d2120669d33f365fcd" alt="">
                    <div class="category-content-name">Ego and Meditation</div>
                    <a href="BTS" class="category-content-description">45 mins</a>
                </div>
            </a>
    </div>
    `
    // TOP PAGE BUTTONS-------------------------------------
    document.getElementById("btn-your-tracks").onclick = () => {
        changeBtnStatus("btn-your-tracks", "#ff6176", "#ffffff");
        changeBtnStatus("btn-your-episodes", "#ffd3da", "black");

        document.getElementById('your-tracks').style.display = "block";
        document.getElementById('your-episodes').style.display = "none";
    }

    document.getElementById("btn-your-episodes").onclick = () => {
        changeBtnStatus("btn-your-episodes", "#ff6176", "#ffffff");
        changeBtnStatus("btn-your-tracks", "#ffd3da", "black");

        document.getElementById('your-episodes').style.display = "block";
        document.getElementById('your-tracks').style.display = "none";
    }

    // DISPLAY PUBLICATION----------------------------
    // Check if there are any tracks
    if (!querySnapshot.empty) {
        currentPage = 1;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        displayData(currentPage);
        if (totalPages != 1) {
            generatePaginationButtons(totalPages);
        }
    } else {
        displayNothing("your-tracks");
    }
}