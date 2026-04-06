import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Replace with your own Firebase project config
// Go to Firebase Console → Project Settings → Your apps → Firebase SDK snippet
const firebaseConfig = {
  apiKey: "[GCP_API_KEY]",
  authDomain: "koolachat-42160.firebaseapp.com",
  projectId: "koolachat-42160",
  storageBucket: "koolachat-42160.firebasestorage.app",
  messagingSenderId: "678854384196",
  appId: "1:678854384196:web:247f45166933753791594f",
  measurementId: "G-29J097B74R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
