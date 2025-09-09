// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions"; 

// Firebase config using VITE environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);        // Authentication
const db = getFirestore(app);     // Firestore database
const storage = getStorage(app);  // File storage
const functions = getFunctions(app); 

// Export everything needed
export { 
  app,  
  auth, 
  db, 
  storage, 
  functions,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc 
};
