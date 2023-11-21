import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
