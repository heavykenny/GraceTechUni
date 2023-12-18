import React, {useState} from 'react';
import {Text, View} from 'react-native';
import InputField from "../common/InputField";
import Styles from "../../constants/styles";
import Button from "../common/Button";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = () => {
        console.log('Reset password for:', email);
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Forgot Password</Text>
            <InputField
                label="Email"
                placeholder={'user@example.com'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <View style={Styles.buttonContainer}>
                <Button icon={'lock-reset'} mode="contained" onPress={handlePasswordReset}>Reset Password</Button>
                <Button icon={'login'} mode="text" onPress={() => navigation.navigate('Login')}>Remembered your
                    password?</Button>
            </View>
        </View>
    );
};

export default ForgotPasswordScreen;
