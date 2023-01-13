import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJPIZwMfKb2qYma21vMArYrL87mSRcWts",
    authDomain: "peoplein-a2096.firebaseapp.com",
    projectId: "peoplein-a2096",
    storageBucket: "peoplein-a2096.appspot.com",
    messagingSenderId: "737081598426",
    appId: "1:737081598426:web:dbeeef38d90d76b0b5a0e3",
    measurementId: "G-2MNE9B1H2X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
