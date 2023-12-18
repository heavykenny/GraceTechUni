// save user to storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export const dataStorage = async (key, value) => {
    try{
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    }catch(e){
        console.log(e);
    }
}

export const dataRetrieve = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if(value !== null){
            return JSON.parse(value);
        }
    } catch (error) {
        return null;
    }
}

export const dataRemove = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        return null;
    }
}


// roles
export const roles = {
    STUDENT: 'student',
    ADMIN: 'admin',
    LECTURER: 'lecturer',
}
