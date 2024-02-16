import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import { auth, firestore } from "./firebase-config.js";

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
      // fetch info from "accounts" collection on Firebase Firestore
      const colRef = collection(firestore, "accounts");
      const querySnapshot = await getDocs(query(colRef, where("email", "==", email)));
      querySnapshot.forEach(doc => {
        // Get data from the document
        const data = doc.data();
        // Loop through the keys in the document data
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // Set each key-value pair to local storage
            localStorage.setItem(key, data[key]);
          }
        }
      });
      alert("Log in successful");
      window.location.href = "home.html";
  } else {
      alert("Log in fail");
    }
  }
};

LoginPage();