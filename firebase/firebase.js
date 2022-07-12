import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "xpensiva.firebaseapp.com",
    projectId: "xpensiva",
    storageBucket: "xpensiva.appspot.com",
    messagingSenderId: "283194596422",
    appId: "1:283194596422:web:9bda0c0b80762dee7f7e47",
    measurementId: "G-73YSPC9SME"
};

let analytics; let firestore;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  firestore = getFirestore();
}

export {analytics, firestore};