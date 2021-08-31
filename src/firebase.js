import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBOf8GHla7eSJnKwRXqVJoezbqw3if-kIY',
  authDomain: 'fir-infinity-e0b73.firebaseapp.com',
  projectId: 'fir-infinity-e0b73',
  storageBucket: 'fir-infinity-e0b73.appspot.com',
  messagingSenderId: '1012088975908',
  appId: '1:1012088975908:web:d0a339caacedf536ca1eb1',
  measurementId: 'G-GFKTVM2HR5'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const analytics = getAnalytics(app);

export { auth,db,createUserWithEmailAndPassword,signInWithEmailAndPassword };