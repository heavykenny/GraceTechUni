import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import InputField from "../common/InputField";
import Styles from "../../constants/styles";
import CustomButton from "../common/CustomButton";
import {registerWithEmail} from "../../services/firebase/auth";
import {dataRetrieve} from "../../constants/functions";
import MessageSnackBar from "../common/MessageSnackBar";

const RegisterScreen = ({navigation}) => {
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            const authenticatedUser = dataRetrieve('userObject').then(r => {
                return r;
            });
            if (authenticatedUser.uid) {
                navigation.navigate('HomeScreen');
            }
        };

        checkAuth().then();
    }, []);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // check valid email address
        if (!email || !password) {
            setMessage('Please enter both email and password');
            setMessageType('error');
            setIsMessageVisible(true);
            return;
        }

        // check if email is empty
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            setMessageType('error');
            setIsMessageVisible(true);
            return;
        }

        // check password length
        if (password.length < 6) {
            setMessage('Password must be at least 6 characters');
            setMessageType('error');
            setIsMessageVisible(true);
            console.log('Password must be at least 6 characters');
            return;
        }

        const userData = {
            email,
            password
        };

        registerWithEmail(userData).then(
            (user) => {
                setMessage('User registered successfully');
                setMessageType('success');
                setIsMessageVisible(true);
                console.log('User registered successfully');

                setTimeout(() => {
                    navigation.navigate('Login');
                }, 3000);
            },
            (error) => {
                setMessage('Error registering user');
                setMessageType('error');
                setIsMessageVisible(true);
                console.log('Error registering user:', error);
            }
        );
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Register</Text>
            <MessageSnackBar
                visible={isMessageVisible}
                onDismiss={() => setIsMessageVisible(false)}
                message={message}
                type={messageType}
            />
            <InputField
                label="Email"
                placeholder={'user@example.com'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <InputField
                label="Password"
                placeholder={'min 6 characters'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <InputField
                label="Confirm Password"
                placeholder={'min 6 characters'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <View style={Styles.buttonContainer}>
                <CustomButton icon={'account-plus'} mode="contained" onPress={handleRegister}>Register</CustomButton>
                <CustomButton icon={'login'} mode="text" onPress={() => navigation.navigate('Login')}>Already have an
                    account?</CustomButton>
            </View>
        </View>
    );
};

export default RegisterScreen;
