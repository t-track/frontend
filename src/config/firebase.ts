import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWaYH6fnf6Etp8kWzjoO5FUejE5sE8ShA",

  authDomain: "t-track-demo.firebaseapp.com",

  projectId: "t-track-demo",

  storageBucket: "t-track-demo.firebasestorage.app",

  messagingSenderId: "303259648078",

  appId: "1:303259648078:web:0dd0b3887215d659d3431f",

  measurementId: "G-GTPLK2KLVQ"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = {} //getFirestore(app);
export default app;