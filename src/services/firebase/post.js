import {getFirestoreDB} from "../../constants/firebase";
import {addDoc, collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';


// isCourseTimeline is true if the post is created in a course timeline
// sort by createdAt
export const getGlobalTimelineData = async () => {
    try {
        const q = query(collection(getFirestoreDB, "PostMD"), where("isCourseTimeline", "==", false));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        return posts.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        throw error;
    }
}

export const userCreatePost = async (post) => {
    try {
        const additionalData = {
            ...post, createdAt: new Date(), updatedAt: new Date(),
        };

        const postRef = await addDoc(collection(getFirestoreDB, 'PostMD'), additionalData);
        const updateId = {
            id: postRef.id
        };
        await setDoc(doc(getFirestoreDB, 'PostMD', postRef.id), updateId, {merge: true});

        return {...additionalData, id: postRef.id};
    } catch (error) {
        throw error;
    }
}
