import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import { collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import { auth, firestore, changeBtnStatus } from "./firebase-config.js";

// Function: Artist Validation-------------------
export const artistValidation = () => {
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

artistValidation();

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

