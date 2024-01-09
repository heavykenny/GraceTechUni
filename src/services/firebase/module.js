import {addDoc, collection, setDoc} from "firebase/firestore";
import {getFirestoreDB} from "../../constants/firebase";

export const fixedModules = [{
    id: '1',
    title: 'Introduction to Computer Science',
    description: 'An introductory module to computer science concepts.',
    credits: 10,
    lecturer: 'John Doe',
    grade: 'A'
}, {
    id: '2',
    title: 'Advanced Mathematics',
    description: 'Deep dive into advanced mathematical theories.',
    credits: 10,
    lecturer: 'Jane Doe',
    grade: 'B'
}, {
    id: '3',
    title: 'Introduction to Psychology',
    description: 'An introductory module to psychology.',
    credits: 4,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '4',
    title: 'Introduction to Philosophy',
    description: 'An introductory module to philosophy.',
    credits: 3,
    lecturer: 'Prof. Johnson',
    grade: 'B+'
}, {
    id: '5',
    title: 'Introduction to English',
    description: 'An introductory module to English.',
    credits: 5,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '6',
    title: 'Introduction to History',
    description: 'An introductory module to history.',
    credits: 5,
    lecturer: 'Prof. Johnson',
    grade: 'B+'
}, {
    id: '7',
    title: 'Introduction to Physics',
    description: 'An introductory module to physics.',
    credits: 10,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '8',
    title: 'Introduction to Chemistry',
    description: 'An introductory module to chemistry.',
    credits: 10,
    lecturer: 'Prof. Johnson',
    grade: 'B+'
}, {
    id: '9',
    title: 'Introduction to Biology',
    description: 'An introductory module to biology.',
    credits: 10,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '10',
    title: 'Introduction to Medicine',
    description: 'An introductory module to medicine.',
    credits: 10,
    lecturer: 'Prof. Johnson',
    grade: 'B+'
}, {
    id: '11',
    title: 'Introduction to Law',
    description: 'An introductory module to law.',
    credits: 10,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '12',
    title: 'Introduction to Business',
    description: 'An introductory module to business.',
    credits: 10,
    lecturer: 'Prof. Johnson',
    grade: 'B+'
}, {
    id: '13',
    title: 'Introduction to Economics',
    description: 'An introductory module to economics.',
    credits: 10,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '14',
    title: 'Introduction to Finance',
    description: 'An introductory module to finance.',
    credits: 10,
    lecturer: 'Prof. Johnson',
    grade: 'B+'
}, {
    id: '15',
    title: 'Introduction to Accounting',
    description: 'An introductory module to accounting.',
    credits: 10,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '16',
    title: 'Introduction to Marketing',
    description: 'An introductory module to marketing.',
    credits: 10,
    lecturer: 'Prof. Johnson',
    grade: 'B+'
}, {
    id: '17',
    title: 'Introduction to Management',
    description: 'An introductory module to management.',
    credits: 10,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '18',
    title: 'Introduction to Engineering',
    description: 'An introductory module to engineering.',
    credits: 10,
    lecturer: 'Prof. Johnson',
    grade: 'B+'
}, {
    id: '19',
    title: 'Introduction to Computer Engineering',
    description: 'An introductory module to computer engineering.',
    credits: 10,
    lecturer: 'Dr. Smith',
    grade: 'A'
}, {
    id: '20',
    title: 'Introduction to Mechanical Engineering',
    description: 'An introductory module to mechanical engineering.',
    credits: 10,
    lecturer: 'Dr. Smith',
    grade: 'A'
}];

export const createAttendanceCode = async (moduleId, code, expiration, currentModule) => {
    try {
        const moduleRef = await addDoc(collection(getFirestoreDB, "ModuleMD"), {
            attendanceCode: code, attendanceCodeExpiration: expiration, moduleId: moduleId, moduleDetails: currentModule
        });
        await setDoc(moduleRef, {id: moduleRef.id, createdAt: new Date()}, {merge: true});
        return moduleRef.id;
    } catch (error) {
        throw error;
    }
}
