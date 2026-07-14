import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWrNYYWR5g1lMY2EJszyRcmhhqqW8lP7I",
  authDomain: "mikewolfwep.firebaseapp.com",
  projectId: "mikewolfwep",
  storageBucket: "mikewolfwep.firebasestorage.app",
  messagingSenderId: "803690993652",
  appId: "1:803690993652:web:719325c9f0b1389f89cba1",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;