import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListScreen from './ListScreen';
import MapScreen from './MapScreen';
import {ActivityIndicator, SafeAreaView, View} from "react-native";
import {PaperProvider} from "react-native-paper";
import CustomButton from "../common/CustomButton";
import Styles from "../../constants/styles";
import CustomHeader from "../common/CustomHeader";
import {getAttendanceRecords} from "../../services/firebase/attendance";
import {useFocusEffect} from "@react-navigation/native";

const LecturerAttendanceScreen = () => {
    const [showList, setShowList] = useState(true);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const toggleScreen = () => {
        setShowList(!showList);
    };

    useEffect(() => {
        setIsLoading(true);
        getAttendanceRecords().then((records) => {
            setIsLoading(false);
            setAttendanceRecords(records);
        }, (error) => {
            console.log('Error retrieving attendance records:', error);
        });
    }, []);

    useFocusEffect(React.useCallback(() => {
        setIsLoading(true);
        getAttendanceRecords().then((records) => {
            setIsLoading(false);
            setAttendanceRecords(records);
        }, (error) => {
            console.log('Error retrieving attendance records:', error);
        });
    }, []));

    if (isLoading) return (<View style={Styles.container}>
        <ActivityIndicator size="large" color="#0000ff"/>
    </View>);

    return (<SafeAreaView style={Styles.screenContainer}>
        <CustomHeader
            title="Lecturer Attendance"
        />
        <PaperProvider >
            <View style={{flex: 1}}>
                {showList ? <ListScreen attendanceRecords={attendanceRecords}/> :
                    <MapScreen attendanceRecords={attendanceRecords}/>}
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <CustomButton
                        icon={showList ? 'map' : 'format-list-bulleted'}
                        mode="outlined"
                        onPress={toggleScreen}
                        style={{margin: 10}}
                    >
                        {showList ? 'Switch to Map' : 'Switch to List'}
                    </CustomButton>
                </View>
            </View>
        </PaperProvider>
    </SafeAreaView>);
};

export default LecturerAttendanceScreen;
