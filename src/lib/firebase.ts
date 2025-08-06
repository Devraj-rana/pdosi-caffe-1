// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "podosi-cafe-online",
  appId: "1:1056741447991:web:0350e11d1db452ae7722b2",
  storageBucket: "podosi-cafe-online.firebasestorage.app",
  apiKey: "AIzaSyD4PRNIuGzfxkQVlSPfQGddJgF4eiTG1Dc",
  authDomain: "podosi-cafe-online.firebaseapp.com",
  messagingSenderId: "1056741447991"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
