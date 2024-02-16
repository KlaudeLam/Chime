import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import { collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import { auth, isArtist, firestore } from "./firebase-config.js";
import { changeBtnStatus } from './common.js';

// Function: Artist Validation-------------------
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

isArtist();

// Function: Register------------------------------
const Register = async (auth, email, password) => {
  let isChecked;
  let info;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    isChecked = true;
  } catch (error) {
    isChecked = false;
    info = error.code;
  }
  return {
    info, 
    isChecked,
  };
};

const RegisterPage = () => {
    document.getElementById("btn-register").onclick = async () => {
        let email = document.getElementById('email-register').value;
        let password = document.getElementById('password-register').value;
        let username = document.getElementById('username-register').value;
        let isArtist = localStorage.getItem("isArtist");
        // let user = userCredential.user;

        const isSuccess = await Register(auth, email, password);
        // Inheritance of OOP: isChecked is a local variable of Register
        // After assigning Register to isSuccess -> isSuccess can use isChecked
        if (isSuccess.isChecked) {
            // Compile acc info
            const data = {
              dateRegistration: Date.now(),
              // userID: user.uid,
              email,
              username,
              isArtist,
            };
            // Upload acc info to localStorage
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                localStorage.setItem(key, data[key]);
              }
            }
            // Upload acc info to Firestore
            const colRef = collection(firestore, "accounts");
            addDoc(colRef, data)
              .then(() => {
                // Kiểm tra Firestore
                onSnapshot(colRef, (snapshot) => {
                  const output = [];
                  snapshot.docs.forEach((doc) => {
                      output.push({...doc.data()});
                  });
                  console.log(output);
                });

                localStorage.setItem("email", email);
                alert("Register successful");
                window.location.href = "home.html";
              })
              .catch((error) => {
                alert("Error uploading data to Firestore:", error);
              })  
        } else {
            alert("Register fail");
        }
    };
};

RegisterPage();

// Click Register----------------------------
// upload to Firestore "accounts" Collection: mail, name, userID, isArtist
// register

// Click Login-------------------------------
// check isArtist: from Firestore "accounts" Collection (with "mail" == mailLogin), fetch "isArtist" and assign to const isArtist 
// localStorage.setItem("isArtist", isArtist)

// Lib/profile display-----------------------

// check isArtist: from Firestore Collection "accounts" (with "mail" == mailLogin), fetch "isArtist" and assign to const isArtist 
// if another user isArtist = true: display "Published tracks", "btnPublish"
// if another user isArtist = false: display "Saved tracks", "btnSaveTrack"

// check userID: from Firestore Collection "accounts" (with "mail" == mailLogin), fetch "userID" and assign to const currentUserID 
// fetch clicked "userID" and assign to const anotherUserID 
// if anotherUserID !== currentUserID: display "btnFollow"

// fetch tracks from "songs"
// display 10 latest tracks with userid==currentUserID (order(time, dsc))