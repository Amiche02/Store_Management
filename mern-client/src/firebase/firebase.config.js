// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFyep3-ztOPQqe8wsBHi6CtN7W59M5cfo",
  authDomain: "inventory-management-db904.firebaseapp.com",
  projectId: "inventory-management-db904",
  storageBucket: "inventory-management-db904.appspot.com",
  messagingSenderId: "1016529217847",
  appId: "1:1016529217847:web:cb9e979ac499ce3e56d2b2",
  measurementId: "G-S2SPHF5WQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;