import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Replace with your own Firebase project config
// Go to Firebase Console → Project Settings → Your apps → Firebase SDK snippet
const firebaseConfig = {
  apiKey: "AIzaSyDbL9niE95TqFKASSoSKzElFNhGjopVRAo",
  authDomain: "koola-chat.firebaseapp.com",
  projectId: "koola-chat",
  storageBucket: "koola-chat.firebasestorage.app",
  messagingSenderId: "229868209322",
  appId: "1:229868209322:web:f18a2d3f4b219b72063cd3",
   measurementId: "G-LS9F453S4K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
