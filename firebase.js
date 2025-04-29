// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB58ZsxmjU5yIiRB3zOYshzDEjnHUyAvMA",
  authDomain: "instant-mall-ed92f.firebaseapp.com",
  projectId: "instant-mall-ed92f",
  storageBucket: "instant-mall-ed92f.firebasestorage.app",
  messagingSenderId: "735130412694",
  appId: "1:735130412694:web:28b3e1e3ab516d240484b7",
  measurementId: "G-6XVKNELCEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export Firestore instance
export default db;