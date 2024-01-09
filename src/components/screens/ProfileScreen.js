import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Avatar, Card, Paragraph, Title} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Styles from "../../constants/styles";
import {getUser, updateUserProfile, uploadProfileImage} from "../../services/firebase/auth";
import InputField from "../common/InputField";
import CustomButton from "../common/CustomButton";
import {dataRemove, dataStorage} from "../../constants/functions";
import * as ImagePicker from 'expo-image-picker';
import {useUser} from "../../context/UserContext";
import UserModel from "../../models/UserModel";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import MessageSnackBar from "../common/MessageSnackBar";
import {useAuth} from "../../context/AuthContext";
import CustomHeader from "../common/CustomHeader";

const ProfileScreen = ({navigation}) => {
    const {updateUserDetails} = useUser();
    const [originalStudentInfo, setOriginalStudentInfo] = useState(UserModel.fromJSON({}));
    const [userModel, setUserModel] = useState(UserModel.fromJSON({}));
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {logout} = useAuth();

    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleLogout = async () => {
        // Implement the logout functionality here
        dataRemove('userObject').then(() => {
            logout();
        }, (error) => {
            console.log('Error logging out user:', error);
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUser();
                if (user) {
                    const userData = UserModel.fromJSON(user);
                    setOriginalStudentInfo(userData);
                    setUserModel(userData);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log('Error retrieving user data:', error);
            }
        };
        fetchUserData().then(r => r);
    }, []);

    const handleEditProfile = () => {
        setUserModel({...originalStudentInfo});
        setEditModalVisible(true);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        const updatedInfo = {
            ...userModel, updatedAt: new Date()
        };

        try {
            updateUserProfile(updatedInfo).then(() => {
                setOriginalStudentInfo(updatedInfo);
                updateUserDetails(updatedInfo);
                setEditModalVisible(false);
                setIsLoading(false);
            })
            setMessage('Profile updated successfully');
            setMessageType('success');
            setIsMessageVisible(true);
            await dataStorage("userObject", UserModel.toJSON(updatedInfo));
        } catch (error) {
            console.error("Error updating user profile:", error);
            setMessage('Error updating profile');
            setMessageType('error');
            setIsMessageVisible(true);
        }
    };

    const onImageSelect = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaType: 'photo', allowsEditing: true, aspect: [1, 1], quality: 1,
        });

        if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            const newPhotoURL = await uploadProfileImage(uri, originalStudentInfo.uid);
            const updatedUserModel = {...originalStudentInfo, photoURL: newPhotoURL, updatedAt: new Date()};
            try {
                await updateUserProfile(updatedUserModel);
                setOriginalStudentInfo(updatedUserModel);
                setUserModel(updatedUserModel);
                await dataStorage("userObject", UserModel.toJSON(updatedUserModel));
                updateUserDetails(updatedUserModel);
                setEditModalVisible(false)

                setMessage('Profile image updated successfully');
                setMessageType('success');
                setIsMessageVisible(true);
            } catch (error) {
                setMessage('Error uploading image');
                setMessageType('error');
                setIsMessageVisible(true);
            }
        }
    };

    const handleNameChange = (text) => {
        setUserModel(prevModel => ({
            ...prevModel, displayName: text
        }));
    };

    const handlePhoneNumberChange = (text) => {
        setUserModel(prevModel => ({
            ...prevModel, phoneNumber: text
        }));
    };

    if (isLoading) {
        return (<View style={Styles.container}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>);
    }

    return (<SafeAreaView style={Styles.screenContainer}>
        <CustomHeader
            title="Profile"
        />
        <KeyboardAwareScrollView style={Styles.scrollView}>
            <View style={Styles.profileHeader}>
                <Avatar.Image size={100} source={{uri: originalStudentInfo.photoURL}} style={Styles.avatar}/>
                <Title style={Styles.name}>{originalStudentInfo.displayName}</Title>
                <Paragraph style={Styles.studentId}>{originalStudentInfo.studentId}</Paragraph>
            </View>

            <Card style={Styles.card}>
                <Title style={Styles.title}>Contact Information</Title>
                <Card.Content>
                    {/* Email Field */}
                    <View style={Styles.cardRow}>
                        <MaterialCommunityIcons name="email" size={20} style={Styles.cardIcon}/>
                        <Paragraph style={Styles.cardText}>Email: {originalStudentInfo.email}</Paragraph>
                    </View>

                    {/* Phone Number Field */}
                    <View style={Styles.cardRow}>
                        <MaterialCommunityIcons name="phone" size={20} style={Styles.cardIcon}/>
                        <Paragraph style={Styles.cardText}>Phone: {originalStudentInfo.phoneNumber}</Paragraph>
                    </View>
                </Card.Content>
            </Card>

            <CustomButton icon="account-edit" mode="outlined" onPress={handleEditProfile} style={Styles.button}>
                Edit Profile
            </CustomButton>

            {/* Edit Profile Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    setEditModalVisible(!editModalVisible);
                }}
            >
                <KeyboardAwareScrollView style={Styles.modalView}>
                    <Title style={Styles.title}>Edit Profile</Title>
                    <View style={Styles.profileHeader}>
                        <TouchableOpacity onPress={onImageSelect} style={Styles.avatarContainer}>
                            <Avatar.Image size={100} source={{uri: originalStudentInfo.photoURL}}
                                          style={Styles.avatar}/>
                            <View style={Styles.editIcon}>
                                <MaterialCommunityIcons name="pencil" size={24} color="black"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <InputField label={'Email'} value={originalStudentInfo.email} disabled={true}/>
                    <InputField label={'Student ID'} value={originalStudentInfo.studentId + ""} disabled={true}/>
                    <InputField label={'Name'} value={userModel.displayName}
                                onChangeText={handleNameChange}/>

                    <InputField label={'Phone Number'}
                                value={userModel.phoneNumber}
                                keyboardType={'phone-pad'}
                                onChangeText={handlePhoneNumberChange}
                                maxLength={13}/>

                    <View style={Styles.buttonContainer}>
                        <CustomButton onPress={() => setEditModalVisible(false)} icon={'close'}
                                      mode={'outlined'}>Cancel</CustomButton>
                        <CustomButton onPress={handleUpdate} icon={'account-edit'}
                                      mode={'contained'}>Update</CustomButton>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>

            <View style={Styles.buttonContainer}>
                <CustomButton icon="logout" mode="contained" onPress={handleLogout}>
                    Logout
                </CustomButton>
            </View>
        </KeyboardAwareScrollView>
        <MessageSnackBar
            visible={isMessageVisible}
            onDismiss={() => setIsMessageVisible(false)}
            message={message}
            type={messageType}
        />
    </SafeAreaView>);
};

export default ProfileScreen;
