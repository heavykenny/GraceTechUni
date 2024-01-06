import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import InputField from "../common/InputField";
import CustomButton from "../common/CustomButton";
import Styles from "../../constants/styles";
import {isUserLoggedIn, loginWithEmail} from "../../services/firebase/auth";
import {useAuth} from "../../context/AuthContext";
import UserModel from "../../models/UserModel";
import {useUser} from "../../context/UserContext";
import MessageSnackBar from "../common/MessageSnackBar";
import {dataStorage} from "../../constants/functions";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const {updateUserDetails} = useUser();
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            displayMessage('Please enter both email and password', 'error');
            return;
        }

        try {
            setIsLoading(true);
            const user = await loginWithEmail(email, password);
            const userModel = UserModel.fromJSON(user);
            await dataStorage("userObject", UserModel.toJSON(userModel));
            updateUserDetails(userModel);
            displayMessage('Login successful', 'success');
            setTimeout(() => {
                login();
            }, 2000);
        } catch (error) {
            displayMessage('Invalid email or password', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const displayMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setIsMessageVisible(true);
    }

    useEffect(() => {
        isUserLoggedIn().then((user) => {
            if (user) {
                console.log('User is logged in:', user);
                login();
            } else {
                setIsLoading(false);
            }
        }, (error) => {
            console.log('Error checking if user is logged in:', error);
        });
        setIsLoading(false);
    }, []);


    if (isLoading) {
        return (<View style={Styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>);
    }


    return (<SafeAreaView style={Styles.screenContainer}>
            <View style={Styles.container}>
                <MessageSnackBar visible={isMessageVisible} onDismiss={() => setIsMessageVisible(false)}
                                 message={message} type={messageType}/>
                <Text style={Styles.title}>Login</Text>

                    <InputField label="Email" placeholder={'user@example.com'} value={email}
                                onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
                    <InputField label="Password" placeholder={'min 6 characters'} value={password}
                                onChangeText={setPassword} secureTextEntry/>
                    <View style={Styles.buttonContainer}>
                        <CustomButton icon={'login'} mode="contained" onPress={handleLogin}>Login</CustomButton>
                        <CustomButton icon={'lock-reset'} mode="text" onPress={() => navigation.navigate('ForgotPassword')}>
                            Forgot Password?
                        </CustomButton>
                        <CustomButton icon={'account-plus'} mode="text" onPress={() => navigation.navigate('Register')}>
                            Don't have an account? Register
                        </CustomButton>
                    </View>
            </View>
        </SafeAreaView>);
};

export default LoginScreen;
