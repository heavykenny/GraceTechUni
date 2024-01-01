import {getFirestoreDB} from "../../constants/firebase";
import {addDoc, collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';

export const createUser = async (user) => {
    try {
        const additionalData = {
            ...user,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const userRef = await addDoc(collection(getFirestoreDB, 'UserMD'), additionalData);
        return userRef.id;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, user) => {
    try {
        const userRef = doc(getFirestoreDB, 'UserMD', id);
        await setDoc(userRef, user, {merge: true});
        return userRef.id;
    } catch (error) {
        throw error;
    }

}

export const getUserDetails = async (userId) => {
    try {
        const q = query(collection(getFirestoreDB, "UserMD"), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        const user = [];
        querySnapshot.forEach((doc) => {
            user.push(doc.data());
        });
        return user[0];
    } catch (error) {
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const users = [];
        const q = query(collection(getFirestoreDB, "UserMD"), where("role", "==", "student"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        return users;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const userRef = doc(getFirestoreDB, 'UserMD', userId);
        await setDoc(userRef, {deletedAt: new Date()}, {merge: true});
        return userRef.id;
    } catch (error) {
        throw error;
    }
}
