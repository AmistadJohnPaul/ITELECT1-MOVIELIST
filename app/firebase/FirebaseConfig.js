// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbAmqqulC2pRm9QG0fMs6ZfMQP4FHwMBs",
  authDomain: "movie-list-be0c8.firebaseapp.com",
  projectId: "movie-list-be0c8",
  storageBucket: "movie-list-be0c8.firebasestorage.app",
  messagingSenderId: "739658609650",
  appId: "1:739658609650:web:c60da8c0a1f17e7a63316b",
  measurementId: "G-K6XE7QDDZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;