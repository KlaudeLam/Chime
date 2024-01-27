import { changeBtnStatus } from "./firebase-config.js";

// ARTIST/USER PAGE-BODY DISPLAY-------------------------------
const isArtist = localStorage.getItem("isArtist");
console.log(isArtist);
const pageBody = document.getElementById("page-body");
console.log("1");
const userHeaderInfo = document.getElementById("user-header-info");
console.log("2");

if (isArtist == "false") {
    // change button to "Add playlist"
    userHeaderInfo.insertAdjacentHTML("beforeend", `<button id="btn-add-playlist" class="block rounded-full bg-bittersweet hover:bg-darkbitterswwet font-semibold text-sm text-white w-fit mt-2 px-4 py-2">Add playlist</button>`);
    // show saved tracks
    pageBody.innerHTML = `
    <div class="flex gap-2 mb-5">
        <button id="btn-your-playlists" class="w-fit rounded-3xl bg-bittersweet text-white py-2 px-4 text-sm">Playlists</button>
        <button id="btn-your-episodes" class="w-fit rounded-3xl bg-[#ffd3da] text-black py-2 px-4 text-sm">Episodes</button>
        <button id="btn-your-artists" class="w-fit rounded-3xl bg-[#ffd3da] text-black py-2 px-4 text-sm">Artists</button>
    </div>
    <div id="your-playlists" class="category">
        <div class="category-title">Your playlists</div>
        <!-- div (max 20 -> see more -> href: page of that category): playlist, songs, etc -->
        <!-- js: addAdjHTML -->
        <!-- animation: think about scrolling effect -->
        <div class="flex gap-2">
            <a href="Silverspoon">
                <div class="category-content">
                    <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                    <div class="category-content-name">Silver Spoon</div>
                    <a href="BTS" class="category-content-description">BTS</a>
                </div>
            </a>
            <a href="Silverspoon">
                <div class="category-content">
                    <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                    <div class="category-content-name">Silver Spoon</div>
                    <a href="BTS" class="category-content-description">BTS</a>
                </div>
            </a>
            <a href="Silverspoon">
                <div class="category-content">
                    <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                    <div class="category-content-name">Silver Spoon</div>
                    <a href="BTS" class="category-content-description">BTS</a>
                </div>
            </a>
        </div>
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
        <!-- div (max 20 -> see more -> href: page of that category): playlist, songs, etc -->
        <!-- js: addAdjHTML -->
        <!-- animation: think about scrolling effect -->
        <a href="Silverspoon">
            <div class="category-content">
                <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                <div class="category-content-name">Silver Spoon</div>
                <a href="BTS" class="category-content-description">Have a sip - 42 mins</a>
            </div>
        </a>
    </div>
    <div id="your-artists" class="category hidden">
        <div class="category-title">Your fav artists</div>
        <!-- div (max 20 -> see more -> href: page of that category): playlist, songs, etc -->
        <!-- js: addAdjHTML -->
        <!-- animation: think about scrolling effect -->
        <a class="category-content-artist" href="Silverspoon">
            <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
            <div class="category-content-artist-name">Vũ.</div>
        </a>
    </div>
    <div id="your-upcoming-event" class="banner-display">
        <!-- div (max 10): new release, world tour -->
        <!-- js: addAdjHTML -->
        <!-- animation: think about scrolling effect -->
        <a href="songlink"><img src="https://phinf.wevpstatic.net/MjAyMjExMTNfMTIg/MDAxNjY4MzIwNjY1MzE1._NqU1ohf8ye8tENAlepfRkbSL5ffDVP--OUqDYRtdC8g.Y5DXfYhapx1mRlcuLb4m2iqjnjSvbA9CpzJ8plTudvIg.PNG/5fd17eb0-f99a-4955-a7ef-5aeb1fd089b0.png" alt=""></a>
        
        <!-- https://0.soompi.io/wp-content/uploads/2022/05/06090034/BTS-12.jpg -->
    </div>
    `
}

if (isArtist == "true") {
    // change button to "publish"
    userHeaderInfo.insertAdjacentHTML("beforeend", `<a href="publish.html" class="w-fit"><button id="btn-publish" class="block rounded-full bg-bittersweet hover:bg-darkbitterswwet font-semibold text-sm text-white w-fit mt-2 px-4 py-2">Publish</button></a>`);
    // show published tracks
    pageBody.innerHTML = `
    <div class="flex gap-2 mb-5">
        <button id="btn-your-playlists" class="w-fit rounded-3xl bg-bittersweet text-white py-2 px-4 text-sm">Playlists</button>
        <button id="btn-your-episodes" class="w-fit rounded-3xl bg-[#ffd3da] text-black py-2 px-4 text-sm">Episodes</button>
    </div>
    <div id="your-playlists" class="category">
        <div class="category-title">Your playlists</div>
        <!-- div (max 20 -> see more -> href: page of that category): playlist, songs, etc -->
        <!-- js: addAdjHTML -->
        <!-- animation: think about scrolling effect -->
        <div class="flex gap-2">
            <a href="Silverspoon">
                <div class="category-content">
                    <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                    <div class="category-content-name">Silver Spoon</div>
                    <a href="BTS" class="category-content-description">BTS</a>
                </div>
            </a>
            <a href="Silverspoon">
                <div class="category-content">
                    <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                    <div class="category-content-name">Silver Spoon</div>
                    <a href="BTS" class="category-content-description">BTS</a>
                </div>
            </a>
            <a href="Silverspoon">
                <div class="category-content">
                    <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                    <div class="category-content-name">Silver Spoon</div>
                    <a href="BTS" class="category-content-description">BTS</a>
                </div>
            </a>
        </div>
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
        <!-- div (max 20 -> see more -> href: page of that category): playlist, songs, etc -->
        <!-- js: addAdjHTML -->
        <!-- animation: think about scrolling effect -->
        <a href="Silverspoon">
            <div class="category-content">
                <img src="https://i.scdn.co/image/ab67616d0000b2734b5186cf9433dcc16b11db5c" alt="">
                <div class="category-content-name">Silver Spoon</div>
                <a href="BTS" class="category-content-description">Have a sip - 42 mins</a>
            </div>
        </a>
    </div>
    `
}

// lke ra nhung path ko dc vao
// when clicked: alert(please log in first --> href.login)

// mot page dieu huong, mot page cho artist/user
// page dieu huong: phan biet artist/user, hien thi thong tin user (ava, name)
// when click lib --> js1 phan biet usser --> js2 dieu huong sang artist/user

// BUTTONS-------------------------------------
document.getElementById("btn-your-playlists").onclick = () => {
    changeBtnStatus("btn-your-playlists", "#ff6176", "#ffffff");
    changeBtnStatus("btn-your-episodes", "#ffd3da", "black");
    changeBtnStatus("btn-your-artists", "#ffd3da", "black");

    document.getElementById('your-playlists').style.display = "block";
    document.getElementById('your-episodes').style.display = "none";
    document.getElementById('your-artists').style.display = "none";
}

document.getElementById("btn-your-episodes").onclick = () => {
    changeBtnStatus("btn-your-episodes", "#ff6176", "#ffffff");
    changeBtnStatus("btn-your-playlists", "#ffd3da", "black");
    changeBtnStatus("btn-your-artists", "#ffd3da", "black");

    document.getElementById('your-episodes').style.display = "block";
    document.getElementById('your-playlists').style.display = "none";
    document.getElementById('your-artists').style.display = "none";
}

document.getElementById("btn-your-artists").onclick = () => {
    changeBtnStatus("btn-your-artists", "#ff6176", "#ffffff");
    changeBtnStatus("btn-your-episodes", "#ffd3da", "black");
    changeBtnStatus("btn-your-playlists", "#ffd3da", "black");

    document.getElementById('your-artists').style.display = "block";
    document.getElementById('your-episodes').style.display = "none";
    document.getElementById('your-playlists').style.display = "none";
}