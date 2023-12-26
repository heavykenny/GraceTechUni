import React, {useState} from 'react';
import {Text, View} from 'react-native';
import InputField from "../common/InputField";
import Styles from "../../constants/styles";
import CustomButton from "../common/CustomButton";

const ForgotPasswordScreen = ({navigation}) => {
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
                <CustomButton icon={'lock-reset'} mode="contained" onPress={handlePasswordReset}>Reset Password</CustomButton>
                <CustomButton icon={'login'} mode="text" onPress={() => navigation.navigate('Login')}>Remembered your
                    password?</CustomButton>
            </View>
        </View>
    );
};

export default ForgotPasswordScreen;
