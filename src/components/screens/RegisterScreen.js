import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import InputField from "../common/InputField";
import Styles from "../../constants/styles";
import Button from "../common/Button";
import {generateStudentId, registerWithEmail} from "../../services/firebase/auth";
import {dataRetrieve, dataStorage} from "../../constants/functions";

const RegisterScreen = ({navigation}) => {
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
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        const userData = {
            email,
            password
        };

        registerWithEmail(userData).then(
            (user) => {
                navigation.navigate('Login');
            },
            (error) => {
                console.log('Error registering user:', error);
            }
        );
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Register</Text>
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
                <Button icon={'account-plus'} mode="contained" onPress={handleRegister}>Register</Button>
                <Button icon={'login'} mode="text" onPress={() => navigation.navigate('Login')}>Already have an
                    account?</Button>
            </View>
        </View>
    );
};

export default RegisterScreen;
