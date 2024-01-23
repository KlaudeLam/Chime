import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

import { auth } from "./firebase-config.js";

// if isArtist: profile(publish, no playlist)
// if !isArtist: profile(no publish, playlist)
const changeBtnStatus = (id, bgColor, textColor) => {
  document.getElementById(id).style.backgroundColor = bgColor;
  document.getElementById(id).style.color = textColor;
}

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
  // to return 2 values -> use {}, return an object of 2 value
  // when key = value: {"info":info, "isChecked": isChecked}
  // is the same as {info, isChecked}
  return {
    info, 
    isChecked,
  };
};

const Login = async (auth, email, password) => {
  let isChecked;
  let info;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
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

const LoginPage = () => {
    document.getElementById("btn-register").onclick = async () => {
        let email = document.getElementById('email-register').value;
        let password = document.getElementById('password-register').value;
        const isSuccess = await Register(auth, email, password);
        // Inheritance of OOP: isChecked is a local variable of Register
        // After assigning Register to isSuccess -> isSuccess can use isChecked
        if (isSuccess.isChecked) {
            alert("Register success");
            localStorage.setItem("email", email);
        } else {
            alert("Register fail");
        }
    };
    document.getElementById("btn-log-in").onclick = async () => {
        let email = document.getElementById('email-log-in').value;
        let password = document.getElementById('password-log-in').value;
        const isSuccess = await Login(auth, email, password);
        // Inheritance of OOP: isChecked is a local variable of Login
        // After assigning Login to isSuccess -> isSuccess can use isChecked
        if (isSuccess.isChecked) {
            alert("Login success");
            localStorage.setItem("email", email);
        } else {
            alert("Login fail");
        }
    };
};

LoginPage();