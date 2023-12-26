import {getFirestoreDB} from "../../constants/firebase";
import {addDoc, collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';

export const createNewCourse = async (course) => {
    try {
        const additionalData = {
            ...course,
            courseId: generateCourseId(course.name),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const courseRef = await addDoc(collection(getFirestoreDB, 'CourseMD'), additionalData);
        return courseRef.id;
    } catch (error) {
        throw error;
    }
}

export const generateCourseId = (courseTitle) => {
    // Generate a course ID from the course title - BSC Computer Science => BSCCS9203
    const courseCode = courseTitle.replace(/\s/g, '').toUpperCase();
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
