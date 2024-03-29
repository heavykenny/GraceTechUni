import {getFirestoreDB} from "../../constants/firebase";
import {collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';

export const updateUser = async (id, user) => {
    try {
        const userRef = doc(getFirestoreDB, 'UserMD', id);
        await setDoc(userRef, user, {merge: true});
        return userRef.id;
    } catch (error) {
        throw error;
    }

}

export const getAllUsers = async () => {
    try {
        const users = [];
        const q = query(collection(getFirestoreDB, "UserMD"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        return users;
    } catch (error) {
        throw error;
    }
}

export const getAllStudents = async () => {
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

export const getAllLecturers = async () => {
    try {
        const users = [];
        const q = query(collection(getFirestoreDB, "UserMD"), where("role", "==", "lecturer"));
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

// for each user UID in users attach courseId to user - must only have one course
export const attachedCourseToUsers = async (courseId, users) => {
    try {
        const batch = [];
        users.forEach((user) => {
            const userRef = doc(getFirestoreDB, 'UserMD', user);
            batch.push(setDoc(userRef, {courseUid: courseId}, {merge: true}));
        });
        await Promise.all(batch);
    } catch (error) {
        throw error;
    }
}

export const detachCourseFromUser = async (userId) => {
    try {
        const userRef = doc(getFirestoreDB, 'UserMD', userId);
        await setDoc(userRef, {courseUid: null}, {merge: true});
        return userRef.id;
    } catch (error) {
        throw error;
    }
}
