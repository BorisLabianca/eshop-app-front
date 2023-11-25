import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAHpVgVWXF3wLkRde7w7m43Kye1CH4QL7g",
  authDomain: "eshopblab.firebaseapp.com",
  projectId: "eshopblab",
  storageBucket: "eshopblab.appspot.com",
  messagingSenderId: "652455408109",
  appId: "1:652455408109:web:c2d408fee6fb273931f7e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
