// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // <-- Importing storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANox_67487HAJzxvic91TT1UZgqCnK2Ek",
    authDomain: "resume-1-85ac4.firebaseapp.com",
    projectId: "resume-1-85ac4",
    storageBucket: "resume-1-85ac4.appspot.com",
    messagingSenderId: "338088196751",
    appId: "1:338088196751:web:c38147be51a6c77e678efa",
    measurementId: "G-HRKY2FG8YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);  // <-- Initializing storage

export { app, auth, db, storage };  // <-- Exporting storage
