
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgCLiZS0j2FQe29ari8UL6lWSgqRR706s",
  authDomain: "c-adminpanel.firebaseapp.com",
  projectId: "c-adminpanel",
  storageBucket: "c-adminpanel.appspot.com",
  messagingSenderId: "361598429528",
  appId: "1:361598429528:web:0ddd64238d1545f3461d2d",
  measurementId: "G-GJTQLG3MSE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);