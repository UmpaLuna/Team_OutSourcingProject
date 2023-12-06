// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLreUyq_ixe3D25sXHghuQPhNduNUE82Y",
  authDomain: "outsourcing-92d48.firebaseapp.com",
  projectId: "outsourcing-92d48",
  storageBucket: "outsourcing-92d48.appspot.com",
  messagingSenderId: "701481317032",
  appId: "1:701481317032:web:f0249f41f57bf49904089d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
