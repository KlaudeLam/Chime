import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import { auth } from './firebase-config.js';

// REDIRECTION--------------------------------
const routeMeta = [
    {
        route: "/dist/download.html",
        requireAuth: false, 
        requireGuest: false, 
    },
    {
        route: "/dist/premium.html",
        requireAuth: false, 
        requireGuest: false, 
    },
    {
        route: "/dist/home.html",
        requireAuth: false, 
        requireGuest: false, 
    },
    {
        route: "/dist/login.html",
        requireAuth: false, 
        requireGuest: true, 
    },
    {
        route: "/dist/register.html",
        requireAuth: false, 
        requireGuest: true, 
    },
    {
        route: "/dist/library.html",
        requireAuth: true, 
        requireGuest: false, 
    },
    {
        route: "/dist/publish.html",
        requireAuth: true, 
        requireGuest: false, 
    },
];
  
function getRouteMeta() {
    const path = window.location.pathname;
    console.log(path);
    return routeMeta.find((r) => r.route == path);
}

onAuthStateChanged(auth, (user) => {
    const meta = getRouteMeta();
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        if (meta?.requireGuest) {
            window.location.href = "home.html";
        }
    } else {
    // User is signed out
        if (meta?.requireAuth) {
            alert("Please log in first");
            window.location.href = "login.html";
        }
    }
    // stopLoading();
});

// function stopLoading() {
//     document.getElementById("loading").remove();

//     document.body.classList.remove("is-loading");
// }

// BURGER MENU---------------------------------
export const burgermenu = () =>  {
    let hiddenMenu = document.getElementById("hidden-menu");

    document.getElementById("btn-hamburger").onclick = () => {
        if (hiddenMenu.classList.contains("hidden")) {
            hiddenMenu.style.position = "fixed";
            hiddenMenu.classList.remove("hidden");
        } else {
            hiddenMenu.classList.add("hidden");
        }
    }
}
// LOG OUT--------------------------------------
export const logout = () => {
    const navBtnLogOut = document.getElementById("nav-btn-log-out");
    const navBtnLogIn = document.getElementById("nav-btn-log-in");

    const Logout = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
            alert("Sign out successful");
            localStorage.clear();
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
}
// MISCELLANEOUS
// Change Button Color
export const changeBtnStatus = (id, bgColor, textColor) => {
    document.getElementById(id).style.backgroundColor = bgColor;
    document.getElementById(id).style.color = textColor;
  }