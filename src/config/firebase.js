import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDUCT75O3i7yI2-EZb9raal-ZlULaz2XHQ",
  authDomain: "fir-course-c6c48.firebaseapp.com",
  projectId: "fir-course-c6c48",
  storageBucket: "fir-course-c6c48.appspot.com",
  messagingSenderId: "280137211063",
  appId: "1:280137211063:web:acea97db71dac4b4914132",
  measurementId: "G-GD2G4PBY3J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);