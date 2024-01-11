import React, {useState} from 'react';
import {Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import InputField from "../common/InputField";
import Styles from "../../constants/styles";
import CustomButton from "../common/CustomButton";
import {resetPassword} from "../../services/firebase/auth";
import MessageSnackBar from "../common/MessageSnackBar";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Appbar} from "react-native-paper";

const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handlePasswordReset = () => {
        if (!email) {
            displayMessage('Please enter your email address', 'error');
        } else {
            resetPassword(email).then(r => {
                displayMessage('Password reset email sent', 'success');
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 3000); // wait for 2 seconds
            }).catch(e => {
                displayMessage('Error resetting password', 'error');
            });
        }
    };

    const displayMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setIsMessageVisible(true);
    }

    return (<KeyboardAwareScrollView style={Styles.screenContainer} contentContainerStyle={{flexGrow: 0.5}}>
        <View>
            <Appbar.Header style={Styles.header}>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
            </Appbar.Header>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={Styles.container}>
                    <View style={Styles.logoContainer}>
                        <Image source={require('../../../assets/images/password.png')} style={Styles.logo}/>
                    </View>
                    <MessageSnackBar visible={isMessageVisible} onDismiss={() => setIsMessageVisible(false)}
                                     message={message} type={messageType}/>
                    <Text style={Styles.title}>Forgot your password?</Text>
                    <InputField
                        label="Enter your email address"
                        placeholder={'user@example.com'}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <View style={Styles.buttonContainer}>
                        <CustomButton icon={'lock-reset'} mode="contained" onPress={handlePasswordReset}>Reset
                            Password</CustomButton>
                        <CustomButton icon={'login'} mode="text" onPress={() => navigation.navigate('Login')}>Remembered
                            your
                            password?</CustomButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>

    </KeyboardAwareScrollView>);
};

export default ForgotPasswordScreen;
