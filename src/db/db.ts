import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import firebase, { getFirestore } from "firebase/firestore"


// Initialize Firebase
export const appFirebaseDb = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebaseDb);