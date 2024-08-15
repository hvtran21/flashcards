// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAvAJNFkPYUga5s3TSnL57mPCMTv4ABEZ4",

  authDomain: "pantry-app-83553.firebaseapp.com",

  projectId: "pantry-app-83553",

  storageBucket: "pantry-app-83553.appspot.com",

  messagingSenderId: "753992721484",

  appId: "1:753992721484:web:3f7aad1bccb842538600e9",

  measurementId: "G-PHL071LZB9",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
