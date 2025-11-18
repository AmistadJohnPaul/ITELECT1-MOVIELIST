// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACQOhYvy2eTtWryb89aTamLeKoemJTn2E",
  authDomain: "vionix-32ebc.firebaseapp.com",
  projectId: "vionix-32ebc",
  storageBucket: "vionix-32ebc.firebasestorage.app",
  messagingSenderId: "458727669822",
  appId: "1:458727669822:web:fa050a532f46bd7e6c116f",
  measurementId: "G-SX2LELQ121"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);