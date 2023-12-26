import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import Styles from "../../constants/styles";
import CustomButton from "../common/CustomButton";
import InputField from "../common/InputField";
import CustomHeader from "../common/CustomHeader";

const AttendanceScreen = ({navigation}) => {
    const [attendanceCode, setAttendanceCode] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([
        // Example data
        {date: '2023-03-01', status: 'Present', course: 'Introduction to Computer Science', code: 'ABC123'},
        {date: '2023-03-02', status: 'Absent', course: 'Introduction to Computer Science', code: 'ABC123'},
        // Add more records as needed
    ]);

    const handleCheckInCode = () => {
        console.log('Check in with code:', attendanceCode);
        // Implement check-in logic here
    };

    const handleQRCodeScanned = (e) => {
        console.log('QR Code Scanned:', e.data);
        // Implement QR code check-in logic here
    };

    return (
        <SafeAreaView style={Styles.screenContainer}>
            <CustomHeader
                title="Attendance"
            />
            <ScrollView style={Styles.scrollView}>
                <View style={Styles.checkInSection}>
                    <InputField
                        label="Attendance Code"
                        placeholder={'Enter Attendance Code'}
                        value={attendanceCode}
                        onChangeText={setAttendanceCode}
                        keyboardType="numeric"
                        maxLength={6}
                    />
                    {/*<Button icon={'login'} mode="contained" style={{backgroundColor: 'blue', fontSize: 40}}*/}
                    {/*        onPress={handleLogin}>Login</Button>*/}
                    <CustomButton icon={'qrcode-scan'} mode="contained" style={{backgroundColor: 'blue', fontSize: 40}}
                                  onPress={handleCheckInCode}>Check In</CustomButton>
                    {/*<QRCodeScanner*/}
                    {/*    onRead={handleQRCodeScanned}*/}
                    {/*    // Additional QRCodeScanner props*/}
                    {/*/>*/}
                </View>

                <Card style={Styles.card}>
                    <Card.Content>
                        <Title>Attendance Records</Title>
                        {attendanceRecords.map((record, index) => (
                            <View key={index} style={Styles.record}>
                                <Paragraph
                                    style={Styles.courseTitle}>{record.course} - {record.code} - {record.status}</Paragraph>
                                <Paragraph style={Styles.date}>{record.date}</Paragraph>
                            </View>
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};
export default AttendanceScreen;
