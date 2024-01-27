// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';


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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

// Login, Register: Artist identification
export const changeBtnStatus = (id, bgColor, textColor) => {
  document.getElementById(id).style.backgroundColor = bgColor;
  document.getElementById(id).style.color = textColor;
}

export const isArtist = () => {
  localStorage.setItem("isArtist", false);

  document.getElementById("asUser").onclick = () => {
  changeBtnStatus("asUser", "#ff6176", "#ffffff");
  changeBtnStatus("asArtist", "#ffd3da", "black");
  localStorage.setItem("isArtist", false);
  }

  document.getElementById("asArtist").onclick = () => {
  changeBtnStatus("asArtist", "#ff6176", "#ffffff");
  changeBtnStatus("asUser", "#ffd3da", "black");
  localStorage.setItem("isArtist", true);
  }
}