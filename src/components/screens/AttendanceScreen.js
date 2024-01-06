import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Styles from "../../constants/styles";
import CustomButton from "../common/CustomButton";
import InputField from "../common/InputField";
import CustomHeader from "../common/CustomHeader";
import FAButton from "../common/FAButton";
import {Title} from "react-native-paper";
import {Camera} from 'expo-camera';
import * as Location from 'expo-location';

const AttendanceScreen = ({navigation}) => {
    const [attendanceCode, setAttendanceCode] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([{
        date: '2023-03-01', status: 'Present', course: 'Introduction to Computer Science', code: 'ABC123'
    }, {date: '2023-03-02', status: 'Absent', course: 'Introduction to Computer Science', code: 'ABC123'},]);

    const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
    const [scanned, setScanned] = useState(false);

    // Permissions and Camera States
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasLocationPermission, setHasLocationPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [isCameraVisible, setIsCameraVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const cameraResponse = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraResponse.status === 'granted');

            const locationResponse = await Location.requestForegroundPermissionsAsync();
            setHasLocationPermission(locationResponse.status === 'granted');

            if (locationResponse.status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            } else {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    }, []);

    const handleQRCodeScanner = () => {
        setIsCameraVisible(!isCameraVisible);
    }

    const handleManualCode = () => {
        setAttendanceModalVisible(true);
        setIsCameraVisible(false);
    }

    const CameraOverlay = () => (<View style={cameraStyles.overlayContainer}>
        <View style={cameraStyles.topBar}>
            <TouchableOpacity
                style={cameraStyles.closeButton}
                onPress={() => setIsCameraVisible(false)}>
                <Text style={cameraStyles.closeButtonText}>✕</Text>
            </TouchableOpacity>
        </View>
        <View style={cameraStyles.instructionContainer}>
            <Text style={cameraStyles.instructionText}>Scan the QR code to check in</Text>
        </View>
        <View style={cameraStyles.bottomBar}>
            <CustomButton mode={'outlined'} onPress={() => {
                handleManualCode()
            }}> Enter code manually </CustomButton>
        </View>
    </View>);

    const handleCheckInCode = () => {
        console.log('Check in with code:', attendanceCode);
        console.log('Location:', location);
        // updateAttendanceRecords(attendanceCode, 'Present'); // Assuming 'Present' for demonstration
        setAttendanceModalVisible(false);
    };

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        console.log('Scanned data:', data, 'of type:', type);
        console.log('Location:', location);

        // close the camera immediately after scanning
        setIsCameraVisible(false);
    };

    const updateAttendanceRecords = (code, status) => {
        setAttendanceRecords(prevRecords => [...prevRecords, {
            date: new Date().toISOString().split('T')[0], status, course: 'Your Course Name', code
        }]);
    };

    if (hasCameraPermission === null || hasLocationPermission === null) {
        return <Text>Requesting for permissions...</Text>;
    }

    if (hasCameraPermission === false || hasLocationPermission === false) {
        return <Text>No access to camera or location</Text>;
    }

    return (<SafeAreaView style={Styles.screenContainer}>
        <CustomHeader title="Attendance"/>

        {isCameraVisible && (<Camera
            style={cameraStyles.camera}
            type={type}
            onBarCodeScanned={handleBarCodeScanned}
        >
            <CameraOverlay/>
        </Camera>)}

        <Modal
            animationType="slide"
            transparent={true}
            visible={attendanceModalVisible}
        >
            <View style={cameraStyles.modalView}>
                <View style={Styles.checkInSection}>
                    <Title style={Styles.title}>Check In</Title>

                    <InputField
                        label="Attendance Code"
                        placeholder={'Enter Attendance Code'}
                        value={attendanceCode}
                        onChangeText={setAttendanceCode}
                        keyboardType="numeric"
                        maxLength={6}
                    />

                    <View style={Styles.buttonContainer}>
                        <CustomButton
                            icon={'login'}
                            mode="contained"
                            onPress={handleCheckInCode}
                        >
                            Check In with Code
                        </CustomButton>

                        <Title style={Styles.title}>or</Title>

                        <CustomButton
                            icon={'qrcode-scan'}
                            mode="contained"
                            onPress={() => {
                                handleQRCodeScanner();
                                setAttendanceModalVisible(false)
                            }}
                        >
                            Scan QR Code
                        </CustomButton>

                        <CustomButton
                            icon={'close'}
                            mode="outlined"
                            onPress={() => {
                                setAttendanceModalVisible(false);
                            }}>
                            Close
                        </CustomButton>
                    </View>
                </View>
            </View>
        </Modal>


        <View style={{position: 'absolute', bottom: 0, right: 0}}>
            {!isCameraVisible && (<FAButton
                icon={'qrcode-scan'}
                onPress={handleQRCodeScanner}
            />)}
        </View>
    </SafeAreaView>);
};

export default AttendanceScreen;

const cameraStyles = StyleSheet.create({
    overlayContainer: {
        flex: 1, justifyContent: 'space-between',
    }, topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingHorizontal: 16,
    }, instructionContainer: {
        // have a semi-transparent black background with border radius
        borderRadius: 20,
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'white',
        height: '50%',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
    }, instructionText: {
        color: 'white', textAlign: 'center',
    }, bottomBar: {
        paddingBottom: 16, paddingHorizontal: 16, alignItems: 'center',
    }, camera: {
        flex: 1,
    }, closeButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        height: 50,
        justifyContent: 'center',
        width: 50,
    }, closeButtonText: {
        color: 'white', fontSize: 40,
    }, modalView: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: '30%',
        width: '100%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});
