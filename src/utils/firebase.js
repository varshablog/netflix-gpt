// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArfelyfmFnBd0iVi6K6j5m66OEo3ntUFk",
  authDomain: "netflixgpt-4f605.firebaseapp.com",
  projectId: "netflixgpt-4f605",
  storageBucket: "netflixgpt-4f605.appspot.com",
  messagingSenderId: "558549275009",
  appId: "1:558549275009:web:05325865deda14a074d880",
  measurementId: "G-XYFC7YP14N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();