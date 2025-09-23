"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArT0QyUc5PwWTpa2QYzqokIHFD_jpH5O0",
  authDomain: "friendlyeast-codelab.firebaseapp.com",
  projectId: "friendlyeast-codelab",
  storageBucket: "friendlyeast-codelab.firebasestorage.app",
  messagingSenderId: "132702462620",
  appId: "1:132702462620:web:ab5549b848c1b22e790359",
};
// Use automatic initialization
// https://firebase.google.com/docs/app-hosting/firebase-sdks#initialize-with-no-arguments
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
