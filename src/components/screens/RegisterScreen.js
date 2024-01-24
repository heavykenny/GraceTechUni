import React, {useEffect, useState} from 'react';
import {Image, Keyboard, Text, TouchableWithoutFeedback, View,} from 'react-native';
import InputField from "../common/InputField";
import Styles from "../../constants/styles";
import CustomButton from "../common/CustomButton";
import {registerWithEmail} from "../../services/firebase/auth";
import {dataRetrieve} from "../../constants/functions";
import MessageSnackBar from "../common/MessageSnackBar";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Appbar} from "react-native-paper";

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
            console.error('Password must be at least 6 characters');
            return;
        }

        const userData = {
            email, password
        };

        registerWithEmail(userData).then((user) => {
            setMessage('User registered successfully');
            setMessageType('success');
            setIsMessageVisible(true);

            setTimeout(() => {
                navigation.navigate('Login');
            }, 3000);
        }, (error) => {
            setMessageType('error');
            setIsMessageVisible(true);
            if (error.code === 'auth/email-already-in-use') {
                setMessage('Email already in use');
                return;
            } else if (error.code === 'auth/invalid-email') {
                setMessage('Invalid email address');
                return;
            } else if (error.code === 'auth/weak-password') {
                setMessage('Password must be at least 6 characters');
                return;
            }
            setMessage('Error registering user');
        });
    };

    return (<KeyboardAwareScrollView style={Styles.screenContainer} contentContainerStyle={{flexGrow: 0.5}}>
        <View>
            <Appbar.Header style={Styles.header}>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
            </Appbar.Header>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={Styles.container}>
                    <View style={Styles.logoContainer}>
                        <Image source={require('../../../assets/images/register.png')} style={Styles.logo}/>
                    </View>
                    <Text style={Styles.title}>Create an account!</Text>
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
                        <CustomButton icon={'account-plus'} mode="contained"
                                      onPress={handleRegister}>Register</CustomButton>
                        <CustomButton icon={'login'} mode="text" onPress={() => navigation.navigate('Login')}>Already
                            have an
                            account?</CustomButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>

    </KeyboardAwareScrollView>);
};

export default RegisterScreen;
