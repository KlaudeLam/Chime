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