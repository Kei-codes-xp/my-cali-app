import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxWzHJL7TZPwTUUE8MMm7geX0DxgZ-x4Q",
  authDomain: "my-cali-165d0.firebaseapp.com",
  projectId: "my-cali-165d0",
  storageBucket: "my-cali-165d0.firebasestorage.app",
  messagingSenderId: "404718278838",
  appId: "1:404718278838:web:7af494aef9034e83d2ee17",
  measurementId: "G-3LC34J8PHH",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
