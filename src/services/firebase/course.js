import {getFirestoreDB} from "../../constants/firebase";
import {addDoc, collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';

export const createNewCourse = async (course) => {
    try {
        // Adding the course to the 'CourseMD' collection
        const courseRef = await addDoc(collection(getFirestoreDB, 'CourseMD'), course);

        // You might want to generate the course code first before adding the document
        const courseCode = generateCourseId(course.name);

        // Define additional metadata to add/merge with the document
        const additionalData = {
            id: courseRef.id, courseCode: courseCode, createdAt: new Date(), updatedAt: new Date(),
        };

        // Update the newly created document with additional data
        await setDoc(courseRef, additionalData, {merge: true});

        // Create the complete course object to return
        return {
            ...course, ...additionalData
        };
    } catch (error) {
        throw error;
    }
};

export const generateCourseId = (courseTitle) => {
    // Generate a course ID from the course title - BSC Computer Science => BSCCS9203
    // take first 5 characters of course title, remove spaces, convert to uppercase
    const courseCode = courseTitle.substring(0, 5).replace(/\s/g, '').toUpperCase();
    return `${courseCode}-${Math.floor(1000 + Math.random() * 9000)}`;
}
export const updateCourse = async (course) => {
    try {
        const courseRef = doc(getFirestoreDB, 'CourseMD', course.id);
        await setDoc(courseRef, course, {merge: true});
        return courseRef.id;
    } catch (error) {
        throw error;
    }

}

export const getCourseDetails = async (courseId) => {
    try {
        const q = query(collection(getFirestoreDB, "CourseMD"), where("id", "==", courseId));
        const querySnapshot = await getDocs(q);
        const course = [];
        querySnapshot.forEach((doc) => {
            course.push(doc.data());
        });
        return course[0];
    } catch (error) {
        throw error;
    }
}

export const getAllCourses = async () => {
    try {
        const courses = [];
        const q = query(collection(getFirestoreDB, "CourseMD"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            courses.push(doc.data());
        });
        return courses;
    } catch (error) {
        throw error;
    }
}

export const deleteCourse = async (courseId) => {
    try {
        const courseRef = doc(getFirestoreDB, 'CourseMD', courseId);
        await setDoc(courseRef, {deletedAt: new Date()}, {merge: true});
        return courseRef.id;
    } catch (error) {
        throw error;
    }
}

export const attachUsersToCourse = async (courseId, users) => {
    try {
        const courseRef = doc(getFirestoreDB, 'CourseMD', courseId);
        await setDoc(courseRef, {users: users}, {merge: true});
        return courseRef.id;
    } catch (error) {
        throw error;
    }
}
