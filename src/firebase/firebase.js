import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAB7ry5h8KBBD0xP-Ca5_qb_GW8iUcJub0",
  authDomain: "crm-hotel-cb96c.firebaseapp.com",
  projectId: "crm-hotel-cb96c",
  storageBucket: "crm-hotel-cb96c.appspot.com",
  messagingSenderId: "1053622666701",
  appId: "1:1053622666701:web:e1c1b27fcfb8b25052b084"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();