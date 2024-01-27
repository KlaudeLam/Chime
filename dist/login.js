import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

import { auth, isArtist } from "./firebase-config.js";

// if isArtist: profile(publish, no playlist)
// if !isArtist: profile(no publish, playlist)
isArtist();

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
  document.getElementById("btn-log-in").onclick = async () => {
  let email = document.getElementById('email-log-in').value;
  let password = document.getElementById('password-log-in').value;
  const isSuccess = await Login(auth, email, password);
  // Inheritance of OOP: isChecked is a local variable of Login
  // After assigning Login to isSuccess -> isSuccess can use isChecked
  if (isSuccess.isChecked) {
      alert("Log in successful");
      localStorage.setItem("email", email);
      window.location.href = "home.html";
  } else {
      alert("Log in fail");
    }
  }
};

LoginPage();