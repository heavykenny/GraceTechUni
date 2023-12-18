import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import InputField from "../common/InputField";
import Button from "../common/Button";
import Styles from "../../constants/styles";
import {isUserLoggedIn, loginWithEmail} from "../../services/firebase/auth";
import {dataStorage} from "../../constants/functions";
import {useAuth} from "../../context/AuthContext";
import UserModel from "../../models/UserModel";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [userModel, setUserModel] = useState(UserModel.fromJSON({}));

    const handleLogin = () => {
        loginWithEmail(email, password).then(
            (user) => {
                setUserModel(UserModel.fromJSON(user));

                dataStorage("userObject", userModel.toString())
                    .then(() => {
                            console.log('User data stored successfully');
                            login();
                        },
                        (error) => {
                            console.log('Error storing user data:', error);
                        }
                    );
            },
            (error) => {
                console.log('Error logging in user:', error);
            }
        )
    };

    useEffect(() => {
        isUserLoggedIn().then(
            (user) => {
                if (user) {
                    login();
                } else {
                    setIsLoading(false);
                }
            },
            (error) => {
                console.log('Error checking if user is logged in:', error);
            }
        );
    }, []);


    if (isLoading) {
        return (
            <View style={Styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }


    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Login</Text>

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
            <View style={Styles.buttonContainer}>
                <Button icon={'login'} mode="contained" style={{backgroundColor: 'blue', fontSize: 40}}
                        onPress={handleLogin}>Login</Button>
                <Button icon={'lock-reset'} mode="text" onPress={() => navigation.navigate('ForgotPassword')}>Forgot
                    Password?</Button>
                <Button icon={'account-plus'} mode="text" onPress={() => navigation.navigate('Register')}>Don't have an
                    account? Register</Button>
            </View>
        </View>
    );
};

export default LoginScreen;
