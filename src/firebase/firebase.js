import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; // Обратите внимание на изменение здесь
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAB7ry5h8KBBD0xP-Ca5_qb_GW8iUcJub0",
  authDomain: "crm-hotel-cb96c.firebaseapp.com",
  projectId: "crm-hotel-cb96c",
  storageBucket: "crm-hotel-cb96c.appspot.com",
  messagingSenderId: "1053622666701",
  appId: "1:1053622666701:web:e1c1b27fcfb8b25052b084"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);
