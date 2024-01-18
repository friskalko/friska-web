// Import the functions you need from the SDKs you need
"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQBXxScBN-JUyGrlhtXRtatELZNmBgrPc",
    authDomain: "friska-backend.firebaseapp.com",
    projectId: "friska-backend",
    storageBucket: "friska-backend.appspot.com",
    messagingSenderId: "953760807410",
    appId: "1:953760807410:web:38a48d5ddd3bc6a0a8936b",
    measurementId: "G-C99X42BEGX",
    databaseURL:
        "https://friska-backend-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = initializeFirestore(app, {});
export const firebaseStorage = getStorage(app);
export const database = getDatabase(app);
