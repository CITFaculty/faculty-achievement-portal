// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvGhHeqHpZNX_E_-RT1WGb2tAsTJF1L_U",
  authDomain: "faculty-achievement-portal.firebaseapp.com",
  databaseURL: "https://faculty-achievement-portal-default-rtdb.firebaseio.com",
  projectId: "faculty-achievement-portal",
  storageBucket: "faculty-achievement-portal.firebasestorage.app",
  messagingSenderId: "826501763103",
  appId: "1:826501763103:web:6ba443e497e8059d95452a",
  measurementId: "G-MM18SHHY8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);