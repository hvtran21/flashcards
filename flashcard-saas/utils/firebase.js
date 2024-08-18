import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBku5TeD77gf5ar8WLm97MnopHz2Z6uU_A",
  authDomain: "flashcards-71726.firebaseapp.com",
  projectId: "flashcards-71726",
  storageBucket: "flashcards-71726.appspot.com",
  messagingSenderId: "76107980811",
  appId: "1:76107980811:web:0ddc537e8bc4f0fb80670e",
  measurementId: "G-PVYKS7LWNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export default db;