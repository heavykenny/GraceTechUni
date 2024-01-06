import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Styles, {cameraStyles} from "../../constants/styles";
import CustomButton from "../common/CustomButton";
import InputField from "../common/InputField";
import CustomHeader from "../common/CustomHeader";
import FAButton from "../common/FAButton";
import {Card, Paragraph, Title} from "react-native-paper";
import {Camera} from 'expo-camera';
import * as Location from 'expo-location';
import {getUser} from "../../services/firebase/auth";
import {
    createAttendanceRecord,
    getAttendanceWithModuleByUserId,
    validateAttendanceCode
} from "../../services/firebase/attendance";
import {convertTimestamp} from "../../utils/helpers";

const AttendanceScreen = ({navigation}) => {
    const [attendanceCode, setAttendanceCode] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
    // Permissions and Camera States
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasLocationPermission, setHasLocationPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCameraVisible, setIsCameraVisible] = useState(false);

    useEffect(() => {
        // Define an async function that we will call immediately
        const initialize = async () => {
            try {
                const userDetails = await getUser();
                setUserDetails(userDetails);

                getAttendanceWithModuleByUserId(userDetails.uid).then(r => {
                    setAttendanceRecords(r);
                    setIsLoading(false);
                });

                const cameraResponse = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(cameraResponse.status === 'granted');

                const locationResponse = await Location.requestForegroundPermissionsAsync();
                setHasLocationPermission(locationResponse.status === 'granted');

                if (locationResponse.status === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    setLocation(location);
                } else {
                    setErrorMsg('Permission to access location was denied.');
                }
            } catch (error) {
                console.error('An error occurred during initialization', error);
            }
        };

        initialize().then(r => r);
    }, []);

    const handleQRCodeScanner = () => {
        setIsCameraVisible(!isCameraVisible);
    }

    const handleManualCode = () => {
        setAttendanceModalVisible(true);
        setIsCameraVisible(false);
        setAttendanceCode('');
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

    const isAttendanceCodeScanned = (code) => {
        return attendanceRecords.find(record => record.attendanceCode === code);
    }

    const handleCheckInCode = () => {
        setAttendanceModalVisible(false);
        setIsLoading(true);
        // check if attendance code is in setAttendanceRecords already
        if (isAttendanceCodeScanned(attendanceCode)) {
            setIsLoading(false);
            alert('Attendance code already scanned');
            return;
        }

        // validate attendance code
        validateAttendanceCode(attendanceCode).then(r => {
            if (!r) {
                setIsLoading(false);
                alert('Invalid attendance code');
            } else {
                createAttendanceRecord({
                    attendanceCode: attendanceCode, location, time: new Date().toISOString(), userId: userDetails.uid
                }).then(r => {
                    getAttendanceWithModuleByUserId(userDetails.uid).then(r => {
                        setAttendanceRecords(r);
                        setIsLoading(false);
                    });
                });
            }
        });
    };

    const handleBarCodeScanned = ({type, data}) => {
        setIsCameraVisible(false);
        setIsLoading(true);

        if (isAttendanceCodeScanned(data)) {
            setIsLoading(false);
            alert('Attendance code already scanned');
            return;
        }

        // validate attendance code
        validateAttendanceCode(data).then(r => {
            if (!r) {
                setIsLoading(false);
                alert('Invalid attendance code');
            } else {
                createAttendanceRecord({
                    attendanceCode: data, location, time: new Date().toISOString(), userId: userDetails.uid
                }).then(r => {
                    getAttendanceWithModuleByUserId(userDetails.uid).then(r => {
                        setAttendanceRecords(r);
                        setIsLoading(false);
                    });
                });
            }
        });
    };

    const renderAttendanceRecord = ({item}) => (<Card style={Styles.card}>
        <Card.Content>
            <Title>{item.module.moduleDetails.title}</Title>
            <Paragraph>By {item.module.moduleDetails.lecturer}</Paragraph>
            <View style={Styles.codeAndTimeContainer}>
                <Text style={Styles.attendanceCode}>
                    Attendance Code: {item.attendanceCode.substring(0, 1)}***{item.attendanceCode.slice(-1)}
                </Text>
                <Text style={Styles.attendanceTime}>
                    Scanned {convertTimestamp(item.time)} ago
                </Text>
            </View>
        </Card.Content>
    </Card>);

    const renderEmpty = () => (<View style={Styles.emptyCoursesContainer}>
        <Title>No Attendance Records Found</Title>
    </View>);

    if (hasCameraPermission === null || hasLocationPermission === null) {
        return <Text>Requesting for permissions...</Text>;
    }

    if (hasCameraPermission === false || hasLocationPermission === false) {
        return <Text>No access to camera or location</Text>;
    }


    if (isLoading) {
        return (<View style={Styles.container}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>);
    }

    return (<SafeAreaView style={Styles.screenContainer}>
        <CustomHeader title="Attendance"/>

        {!isCameraVisible && !attendanceModalVisible && <FlatList
            data={attendanceRecords}
            renderItem={renderAttendanceRecord}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{padding: 5}}
            ListEmptyComponent={renderEmpty}
        />}

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
