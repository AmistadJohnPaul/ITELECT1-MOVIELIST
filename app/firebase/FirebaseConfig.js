// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkCfPpkn--CerJ2ncpbbyiN5v9MK-VEOc",
  authDomain: "vionix-27702.firebaseapp.com",
  projectId: "vionix-27702",
  storageBucket: "vionix-27702.firebasestorage.app",
  messagingSenderId: "995837144994",
  appId: "1:995837144994:web:3757a2e40aef690eb34cfb",
  measurementId: "G-4ZMMB9731T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);