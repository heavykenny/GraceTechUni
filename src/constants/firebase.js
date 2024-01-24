import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getDatabase} from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyCySb6hlWQdlbX9Xr6GjPeM9Ohmi9WbfbE",
    authDomain: "mobile-project-459a3.firebaseapp.com",
    projectId: "mobile-project-459a3",
    storageBucket: "mobile-project-459a3.appspot.com",
    messagingSenderId: "304035339686",
    appId: "1:304035339686:web:6de32144bc40298eeec367",
    measurementId: "G-C9GJQ4CH0G"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const getFirestoreDB = getFirestore(app);

const getDatabaseDB = getDatabase(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export {auth, getFirestoreDB, getDatabaseDB};
