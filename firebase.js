// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// 🔑 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBZsvxosJi-3l301V9oq_-T6WnKWIJWKjM",
  authDomain: "linen-marking-472009-h3.firebaseapp.com",
  projectId: "linen-marking-472009-h3",
  storageBucket: "linen-marking-472009-h3.appspot.com",
  messagingSenderId: "69055316805",
  appId: "1:69055316805:web:c2cda7a81806c5fb8b342c",
};

// ✅ Initialize only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ✅ Export correctly
export const auth = firebase.auth();
export default firebase;
