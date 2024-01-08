import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Card, Modal, Paragraph, Title} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Styles from "../../constants/styles";
import CustomHeader from "../common/CustomHeader";
import {createAttendanceCode, fixedModules} from "../../services/firebase/module";
import userModel from "../../models/UserModel";

const ModulesScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    const [attendanceCode, setAttendanceCode] = useState('');
    const [expirationTime, setExpirationTime] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(remainingTime => remainingTime - 1);
            }, 1000);
        } else if (remainingTime === 0) {
            setModalVisible(false);
            // Reset the expiration time and code
            setExpirationTime(0);
        }
        return () => clearInterval(interval); // This is the cleanup function to clear the interval
    }, [remainingTime]);

    const renderModule = ({item}) => (<Card style={Styles.card} onPress={() => handleModuleClick(item.id)}>
        <Card.Content>
            <Title>{item.title}</Title>
            <Paragraph>{item.description}</Paragraph>
        </Card.Content>
    </Card>);

    const handleModuleClick = (moduleId) => {
        const generatedCode = generateAttendanceCode();
        setAttendanceCode(generatedCode.code);
        setExpirationTime(generatedCode.expiration);
        setCurrentModule(fixedModules.find(module => module.id === moduleId));
        createAttendanceCode(moduleId, generatedCode.code, generatedCode.expiration, currentModule).then(r => r);
        setModalVisible(true);
    };

    const generateAttendanceCode = () => {
        // Generate a random attendance code
        const code = Math.random().toString(36).substr(2, 6).toUpperCase();
        // Set expiration time to 5 minutes from now
        const expiration = new Date(new Date().getTime() + 5 * 60000);
        setExpirationTime(expiration);
        setRemainingTime(0.5 * 60);
        return {code, expiration};
    };

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (<SafeAreaView style={Styles.screenContainer}>
        <CustomHeader
            title={userModel.role === 'admin' ? 'Admin Modules' : 'Lecturer Modules'}
        />
        <FlatList
            data={fixedModules}
            renderItem={renderModule}
            keyExtractor={(item) => item.id}
        />

        <Modal
            style={Styles.modalContainer}
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
        >
            <Card>
                <Card.Content>
                    <Title style={Styles.cardTitle}>{currentModule?.title}</Title>
                    <Paragraph style={additionalStyles.expiry}>Enter the following code or scan the QR code to check
                        in.</Paragraph>
                    <Paragraph style={additionalStyles.attendanceCode}>{attendanceCode}</Paragraph>
                    <View style={additionalStyles.qrCode}>
                        <QRCode value={attendanceCode} size={200}/>
                    </View>

                    <Paragraph style={additionalStyles.expiry}>Expires in: {formatTime(remainingTime)}</Paragraph>
                </Card.Content>
            </Card>
        </Modal>
    </SafeAreaView>);
};


export default ModulesScreen;


const additionalStyles = StyleSheet.create({
    attendanceCode: {
        fontSize: 40, textAlign: 'center', marginVertical: 10, fontWeight: 'bold', padding: 30,
    }, expiry: {
        fontSize: 15, textAlign: 'center', fontStyle: 'italic',marginHorizontal: 30,
    }, qrCode: {
        alignSelf: 'center', marginHorizontal: 50, justifyContent: 'center', marginBottom: 20, marginTop: 10,
    },
});
