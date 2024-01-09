import {addDoc, collection, getDocs, query, setDoc, where} from 'firebase/firestore';
import {getFirestoreDB} from "../../constants/firebase";

export const createAttendanceRecord = async (data) => {
    try {
        const attendanceRef = await addDoc(collection(getFirestoreDB, "AttendanceMD"), data);
        await setDoc(attendanceRef, {id: attendanceRef.id}, {merge: true});
        return attendanceRef.id;
    } catch (error) {
        throw error;
    }
}

export const getAttendanceWithModuleByUserId = async (userId) => {
    try {
        const attendanceQuery = query(collection(getFirestoreDB, "AttendanceMD"), where("userId", "==", userId));
        const attendanceSnapshot = await getDocs(attendanceQuery);

        const combinedData = [];

        for (const attendanceDoc of attendanceSnapshot.docs) {
            const attendanceData = attendanceDoc.data();
            const moduleQuery = query(collection(getFirestoreDB, "ModuleMD"), where("attendanceCode", "==", attendanceData.attendanceCode));
            const moduleSnapshot = await getDocs(moduleQuery);

            moduleSnapshot.forEach((moduleDoc) => {
                const moduleData = moduleDoc.data();
                combinedData.push({
                    ...attendanceData, module: moduleData
                });
            });
        }

        combinedData.sort((a, b) => new Date(b.time) - new Date(a.time));
        return combinedData;
    } catch (error) {
        console.error("Error fetching combined attendance and module data: ", error);
        throw error;
    }
}

export const validateAttendanceCode = async (code) => {
    try {
        const moduleQuery = query(collection(getFirestoreDB, "ModuleMD"), where("attendanceCode", "==", code));
        const moduleSnapshot = await getDocs(moduleQuery);

        if (moduleSnapshot.empty) {
            return false;
        }

        const moduleData = moduleSnapshot.docs[0].data();
        const expiration = new Date(moduleData.attendanceCodeExpiration.seconds * 1000); // Convert Firestore timestamp to Date

        const now = new Date();

        return now <= expiration;

    } catch (error) {
        console.error("Error validating attendance code: ", error);
        throw error;
    }
}

export const getAttendanceRecords = async () => {
    try {
        const attendanceQuery = query(collection(getFirestoreDB, "AttendanceMD"));
        const attendanceSnapshot = await getDocs(attendanceQuery);

        const combinedData = [];

        for (const attendanceDoc of attendanceSnapshot.docs) {
            const attendanceData = attendanceDoc.data();
            const userQuery = query(collection(getFirestoreDB, "UserMD"), where("uid", "==", attendanceData.userId));
            const userSnapshot = await getDocs(userQuery);

            // join ModuleMD where attendanceCode == attendanceData.attendanceCode
            const moduleQuery = query(collection(getFirestoreDB, "ModuleMD"), where("attendanceCode", "==", attendanceData.attendanceCode));
            const moduleSnapshot = await getDocs(moduleQuery);

            userSnapshot.forEach((userDoc) => {
                const userData = userDoc.data();
                moduleSnapshot.forEach((moduleDoc) => {
                    const moduleData = moduleDoc.data();
                    combinedData.push({
                        ...attendanceData, user: userData, module: moduleData
                    });
                });
            });
        }

        combinedData.sort((a, b) => new Date(b.time) - new Date(a.time));
        return combinedData;
    }
    catch (error) {
        console.error("Error fetching combined attendance and user data: ", error);
        throw error;
    }
}

