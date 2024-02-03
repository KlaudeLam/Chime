import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import { auth } from './firebase-config.js';

// BURGER MENU---------------------------------
let hiddenMenu = document.getElementById("hidden-menu");

document.getElementById("btn-hamburger").onclick = () => {
    if (hiddenMenu.classList.contains("hidden")) {
        hiddenMenu.style.position = "fixed";
        hiddenMenu.classList.remove("hidden");
    } else {
        hiddenMenu.classList.add("hidden");
    }
}

// LOG OUT--------------------------------------
const navBtnLogOut = document.getElementById("nav-btn-log-out");
const navBtnLogIn = document.getElementById("nav-btn-log-in");

const Logout = () => {
    signOut(auth).then(() => {
    // Sign-out successful.
        alert("Sign out successful");
        localStorage.removeItem("isArtist");
        localStorage.removeItem("email");
        window.location.href = "home.html";
    }).catch((error) => {
    // An error happened.
        alert("Sign out fail");
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.use
      navBtnLogIn.style.display = "none";
      navBtnLogOut.style.display = "block";
      // ...
    } else {
      // User is signed out
      navBtnLogIn.style.display = "block";
      navBtnLogOut.style.display = "none";
    }
})

navBtnLogOut.onclick =  () => {
    Logout();
}

// if logged: btnLogout appear, btnLogin hidden (viceversa)