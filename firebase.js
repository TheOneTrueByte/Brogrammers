import "firebase/firestore";
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCml_AxQYdLee-QUAR3CYw83w914zbTsuU",
  authDomain: "soccer-inventory-ab9f4.firebaseapp.com",
  projectId: "soccer-inventory-ab9f4",
  storageBucket: "soccer-inventory-ab9f4.appspot.com",
  messagingSenderId: "204772762321",
  appId: "1:204772762321:web:e31691245d98cc84381bf0",
  measurementId: "G-EBZ53PWMLN"
}

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();

export { auth }