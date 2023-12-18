import {auth, getFirestoreDB} from '../../constants/firebase';
import {createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';
import {collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';
import {dataRetrieve} from "../../constants/functions";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

// Register a new user
export const registerWithEmail = async (userData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const user = userCredential.user;
        // Add additional user data to Firestore
        const additionalData = {
            email: userData.email,
            uid: user.uid,
            studentId: generateStudentId(),
            phoneNumber: '',
            displayName: '',
            photoURL: 'https://i.imgur.com/7k12EPD.png',
            role: 'student',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await setDoc(doc(getFirestoreDB, 'UserMD', user.uid), additionalData);
        return user;
    } catch (error) {
        throw error;
    }
};

// Login user
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return await getUserDetailsByUID(userCredential.user.uid); // Return the user data obtained from getUserDetailsByUID
    } catch (error) {
        // Handle errors here
        throw error;
    }
};


// Reset password
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        // Email sent successfully
    } catch (error) {
        // Handle errors here
        throw error;
    }
};

// check if user is logged in
export const isUserLoggedIn = async () => {
    try {
        const user = await getUser();
        return user !== null;
    } catch (error) {
        console.error('Error checking if user is logged in:', error);
        return false;
    }
};

export const getUser = async () => {
    try {
        const user = await dataRetrieve('userObject');
        if (user && user.uid !== null) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};


// generate student id number - 6 digits
export const generateStudentId = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// update user profile
export const updateUserProfile = async (userData) => {
    try {
        console.log(userData);
        // doc(db, 'UserMD', userData.uid).update(userData);
        return await setDoc(doc(getFirestoreDB, 'UserMD', userData.uid), userData);
    } catch (error) {
        throw error;
    }
};

// upload user profile image
export const uploadProfileImage = async (imageUri, uid) => {
    try {
        const storage = getStorage();
        const imageName = `profileImages/${uid}`; // Replace with your logic to generate a unique file name
        const imageRef = ref(storage, imageName);

        const response = await fetch(imageUri);
        const blob = await response.blob();

        await uploadBytes(imageRef, blob);
        return await getDownloadURL(imageRef);
    } catch (error) {
        console.error("Error uploading image here:", error);
        throw error;
    }
};


const getUserDetailsByUID = async (uid) => {
    try {
        const dataQuery = [];
        const q = query(collection(getFirestoreDB, "UserMD"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            dataQuery.push(doc.data());
        });
        return dataQuery[0];
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};

