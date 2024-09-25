import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPceuNylKnN1Y8UH8M5VtXGBPNEs-3Cd0",
    authDomain: "avani-3ee4b.firebaseapp.com",
    projectId: "avani-3ee4b",
    storageBucket: "avani-3ee4b.appspot.com",
    messagingSenderId: "1081108000726",
    appId: "1:1081108000726:web:13de0f44da9ae4e5933e77",
    measurementId: "G-WKEKH4X8DF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {auth, db , storage };
