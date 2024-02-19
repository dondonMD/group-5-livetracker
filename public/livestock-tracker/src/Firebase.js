import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDgABC-3kUS69dT2yFglDk20qnYievsylY",
  authDomain: "live-stock-tracker-ab5a7.firebaseapp.com",
  projectId: "live-stock-tracker-ab5a7",
  storageBucket: "live-stock-tracker-ab5a7.appspot.com",
  messagingSenderId: "1023174066627",
  appId: "1:1023174066627:web:92e213a2160aaf24237d76",
  measurementId: "G-F9YTV1J8B3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Renamed to 'db'

export { auth, app, db }; // Export 'db' along with 'auth' and 'app'

// Wrap your entire application with Router component
