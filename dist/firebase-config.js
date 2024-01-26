// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV7HHy_CFpROAYH10bVLTIF0OgOH58ud4",
  authDomain: "chime-27321.firebaseapp.com",
  projectId: "chime-27321",
  storageBucket: "chime-27321.appspot.com",
  messagingSenderId: "305908965580",
  appId: "1:305908965580:web:f1ce621b1e6563f4aaa269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const navBtnLogIn = document.getElementById("nav-btn-log-in");
const navBtnLogOut = document.getElementById("nav-btn-log-out");

const Logout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Sign out successful");
  }).catch((error) => {
    // An error happened.
    alert("Sign out failed")
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    navBtnLogIn.style.display = "none";
    navBtnLogOut.style.display = "block";
    // ...
  } else {
    // User is signed out
    // ...
    navBtnLogIn.style.display = "block";
    navBtnLogOut.style.display = "none";
  }
});

navBtnLogOut.onclick = () => {
  Logout();
}