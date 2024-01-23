let btnPlay = document.getElementsByClassName("btnPlay");
let btnPause = document.getElementsByClassName("btnPause");

for (let j = 0; j < btnPlay.length; j++) {
    btnPlay[j].onclick = () => {
        for (let i = 0; i < btnPlay.length; i++) {
            btnPause[i].style.display = 'block';
            btnPlay[i].style.display = 'none';
        }
    }
}

for (let j = 0; j < btnPlay.length; j++) {
    btnPause[j].onclick = () => {
        for (let i = 0; i < btnPlay.length; i++) {
            btnPause[i].style.display = 'none';
            btnPlay[i].style.display = 'block';
        }
    }
}

let hiddenMenu = document.getElementById("hidden-menu");

document.getElementById("btn-hamburger").onclick = () => {
    if (hiddenMenu.style.display == "none") {
        hiddenMenu.style.position = "fixed";
        hiddenMenu.style.display = "block";
    } else {
        hiddenMenu.style.display = "none";
    }
}

// if logged: btnLogout appear, btnLogin hidden (viceversa)