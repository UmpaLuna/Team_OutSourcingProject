// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHRSvZhHvfXkPp0kMB4tW858c1BcmX-Vw",
  authDomain: "sparta-outsourcing.firebaseapp.com",
  projectId: "sparta-outsourcing",
  storageBucket: "sparta-outsourcing.appspot.com",
  messagingSenderId: "281996019522",
  appId: "1:281996019522:web:174dc868df0ad1bfb36adb",
  measurementId: "G-45SKJEB1HF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
