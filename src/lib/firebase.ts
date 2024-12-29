import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCp5G1bFCFM9OldERKr9cU3gKc-pI31HGU",
  authDomain: "ticketcentral-519b8.firebaseapp.com",
  projectId: "ticketcentral-519b8",
  storageBucket: "ticketcentral-519b8.firebasestorage.app",
  messagingSenderId: "232689485572",
  appId: "1:232689485572:web:da1286e8aada72b100f251",
  measurementId: "G-Z7DCDRDYPW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
