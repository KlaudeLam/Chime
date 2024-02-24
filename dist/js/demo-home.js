// ALBUM---------------------------------------------------------
const albums = [
    {
        title: "GOLDEN",
        artist: "Jungkook",
        thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/86/78/b4/8678b4b3-2341-7239-b6cb-bcfdaef0e4e0/196922656545_Cover.jpg/1200x1200bb.jpg"
    },
    {
        title: "I FEEL",
        artist: "(G)I-dle",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/d/dc/%28G%29I-dle_-_I_Feel_digital.png"
    },
    {
        title: "LOI CHOI",
        artist: "Wren Evans",
        thumbnail: "https://bizweb.dktcdn.net/100/411/628/products/harpers-bazaar-wren-evans-ra-mat-album-loi-choi-03-1024x1024.jpg?v=1702651230007"
    },
    {
        title: "HOÀNG",
        artist: "Hoàng Thùy Linh",
        thumbnail: "https://product.hstatic.net/1000304920/product/album-hoang-thuy-linh-vol-3-hoang_e076613dc5954d719ba466416a3a25ec.jpg"
    },
    {
        title: "Immunity",
        artist: "Clairo",
        thumbnail: "https://i1.sndcdn.com/artworks-000576112478-rp6epv-t500x500.jpg"
    },
    {
        title: "Mãi Yêu",
        artist: "Mỹ Tâm",
        thumbnail: "https://vcdn-giaitri.vnecdn.net/2018/03/02/my-tam-2-7282-1519985783.jpg"
    }
];

albums.forEach(album => {
    const albumTemplate= 
    `<div class="category-content" title='${album.title}'>
        <img src=${album.thumbnail} alt="">
        <div class="category-content-name">${album.title}</div>
        <a href="BTS" class="category-content-description">Album - ${album.artist}</a>
    </div>`

    document.getElementById("popular-albums").insertAdjacentHTML("beforeend",albumTemplate); 
})

// PLAYLIST-----------------------------------------------------
const playlists = [
    {
        title: "This is ENHYPEN",
        thumbnail: "https://i.scdn.co/image/ab67706f000000022a7a5b0ae24f39073a43434d",
        duration: "44mins",
    },

    {
        title: "Timeless Work by Debussy",
        thumbnail: "https://img.cdandlp.com/2018/05/imgL/119173119.jpg",
        duration: "13h37m",
    },
    {
        title: "Tình Khúc Nhạc Hoa Lời Việt Hay Nhất",
        thumbnail: "https://avatar-ex-swe.nixcdn.com/playlist/2013/12/04/a/c/b/4/1386155848765_500.jpg",
        duration: "3h25m",
    },
    {
        title: "Những Bài Ca Không Năm Tháng",
        thumbnail: "https://cdn0.fahasa.com/media/catalog/product/t/r/trinh_cong_son___tuyen_tap_nhung_bai_ca_khong_nam_thang_1_2019_02_18_16_32_28.jpg",
        duration: "2h17m"
    },
    {
        title: "This is Eminem",
        thumbnail: "https://i1.sndcdn.com/artworks-000840792931-hhfbsk-t500x500.jpg",
        duration: "1h03m",

    },
    {
        title: "Rap Việt Mùa 1",
        thumbnail: "https://i.scdn.co/image/ab67616d0000b273a638857d5dbb2ac1f1dc39f0",
        duration: "27h46m",
    }
];


playlists.forEach(playlist => {
    const playlistTemplate= 
    `<div class="category-content" title='${playlist.title}'>
        <img src=${playlist.thumbnail} alt="">
        <div class="category-content-name">${playlist.title}</div>
        <a href="" class="category-content-description">${playlist.duration}</a>
    </div>`;

    document.getElementById("playlists").insertAdjacentHTML("beforeend",playlistTemplate); 
});

// EPISODES--------------------------------------------------------
const episodes = [
    {
        title: "#14 TS. Giản Tư Trung: Bạn đã có thước đo thành công cho riêng mình chưa?",
        thumbnail: "https://i.scdn.co/image/ab6765630000ba8a69db090a929a329b28236d2d",
        duration: "1h07m",
    },

    {
        title: "Đứa trẻ hiểu chuyện không có kẹo ăn",
        thumbnail: "https://i.scdn.co/image/ab6765630000ba8ab39c89714304bdc026f57cb0",
        duration: "14mins",
    },
    {
        title: "What apes can tell us about the origins of teasing",
        thumbnail: "https://uploads.guim.co.uk/2021/11/17/ScienceWeekly_FINAL_3000.jpeg",
        duration: "15mins",
    },
    {
        title: "Elementary | Seoul",
        thumbnail: "https://i.scdn.co/image/28346886bb101362ada119e91030c902de486c9e",
        duration: "15mins"
    },
    {
        title: "459: Das ist halt so",
        thumbnail: "https://static1.squarespace.com/static/5d6fac900590760001b18dbf/t/5d9e6b007ec40569f739e888/1642450696678/Easy-German-Podcast.jpg?format=1500w",
        duration: "32mins",

    },
    {
        title: "#26: Overthinking - người nghĩ lắm",
        thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/e0/35/e4/e035e4c1-ee2f-eeed-8ae0-a35671f1da98/mza_12052049631279304461.jpg/1200x1200bb.jpg",
        duration: "28mins",
    }
];


episodes.forEach(episode => {
    const episodeTemplate= 
    `<div class="category-content" title='${episode.title}'>
        <img src=${episode.thumbnail} alt="">
        <div class="category-content-name">${episode.title}</div>
        <a href="" class="category-content-description">${episode.duration}</a>
    </div>`;

    document.getElementById("episodes-for-you").insertAdjacentHTML("beforeend",episodeTemplate); 
});

// ARTIST--------------------------------------------------------
const artists = [
    {
        artist: "Vũ.",
        thumbnail: "https://nld.mediacdn.vn/291774122806476800/2022/9/17/anh-chup-man-hinh-2022-09-17-luc-141150-1663399106583640943036.png",
        role: "Singer"
    },

    {
        artist: "j-hope",
        thumbnail: "https://upload.wikimedia.org/wikipedia/vi/8/87/%E1%BA%A2nh_b%C3%ACa_album_J-Hope_Jack_in_the_Box_c%E1%BB%A7a_KAWS.png",
        role: "Rapper"
    },
    {
        artist: "OKDAL",
        thumbnail: "https://koreajoongangdaily.joins.com/data/photo/2023/06/07/f57ed56d-c4d7-4543-bb44-62f197c5ee2d.jpg",
        role: "Singer"
    },
    {
        artist: "Polyphia",
        thumbnail: "https://lh3.googleusercontent.com/vxggobSBo01pcCcimCXg9f2zPPFQpMR-0C0HYO9CL2NNHH-_hX2083EtVHX3trALsrz553nsUe_MLUeS=w2880-h1200-p-l90-rj",
        role: "Band"
    },
    {
        artist: "Ayase",
        thumbnail: "https://cdns-images.dzcdn.net/images/artist/c14eddf03861cff428c404d3bb185117/264x264.jpg",
        role: "Composer"
    },
    {
        artist: "Bruno Mars",
        thumbnail: "https://charts-static.billboard.com/img/2010/01/bruno-mars-c75-344x344.jpg",
        role: "Singer"
    }
];

artists.forEach(artist => {
    const artistTemplate= 
    `<div class="category-content-artist" title='${artist.artist}'>
        <img src=${artist.thumbnail} alt="">
        <div class="category-content-name">${artist.artist}</div>
        <a href="" class="category-content-description">${artist.role}</a>
    </div>`;

    document.getElementById("fav-artists").insertAdjacentHTML("beforeend",artistTemplate); 
});