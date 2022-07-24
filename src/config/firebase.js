import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAApmUTxEH3Bsjlqtp-Y1q_u3NxKgZhZmU",
  authDomain: "realspace-game.firebaseapp.com",
  projectId: "realspace-game",
  storageBucket: "realspace-game.appspot.com",
  messagingSenderId: "483230636315",
  appId: "1:483230636315:web:d182ca2706aea6b14f5bbe"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export default app;
