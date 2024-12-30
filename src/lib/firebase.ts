import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCp5G1bFCFM9OldERKr9cU3gKc-pI31HGU",
  authDomain: "ticketcentral-519b8.firebaseapp.com",
  projectId: "ticketcentral-519b8",
  storageBucket: "ticketcentral-519b8.firebasestorage.app",
  messagingSenderId: "232689485572",
  appId: "1:232689485572:web:da1286e8aada72b100f251",
  measurementId: "G-Z7DCDRDYPW",
  databaseURL: "https://ticketcentral-519b8-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);