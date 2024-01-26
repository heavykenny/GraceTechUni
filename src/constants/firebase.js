import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getDatabase} from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyAnc3tUw5J8IupSEIMnPZ-e92OzGsp_6_o",
    authDomain: "unimoon-gracetechuni.firebaseapp.com",
    projectId: "unimoon-gracetechuni",
    storageBucket: "unimoon-gracetechuni.appspot.com",
    messagingSenderId: "199264940899",
    appId: "1:199264940899:web:efadc7c4630224955ed956",
    measurementId: "G-QFQEGEG18N"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const getFirestoreDB = getFirestore(app);

const getDatabaseDB = getDatabase(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export {auth, getFirestoreDB, getDatabaseDB};
