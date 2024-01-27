import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

import { auth, isArtist } from "./firebase-config.js";

// if isArtist: profile(publish, no playlist)
// if !isArtist: profile(no publish, playlist)
isArtist();

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
        const isSuccess = await Register(auth, email, password);
        // Inheritance of OOP: isChecked is a local variable of Register
        // After assigning Register to isSuccess -> isSuccess can use isChecked
        if (isSuccess.isChecked) {
            alert("Register successful");
            localStorage.setItem("email", email);
            window.location.href = "home.html";
        } else {
            alert("Register fail");
        }
    };
};

RegisterPage();