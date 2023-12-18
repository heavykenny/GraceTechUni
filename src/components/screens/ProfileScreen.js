import React, {useState} from 'react';
import {ActivityIndicator, Modal, SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {Avatar, Card, Paragraph, Title} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Styles from "../../constants/styles";
import {getUser, updateUserProfile, uploadProfileImage} from "../../services/firebase/auth";
import InputField from "../common/InputField";
import Button from "../common/Button";
import {dataStorage} from "../../constants/functions";
import * as ImagePicker from 'expo-image-picker';
import {useUser} from "../../context/UserContext";

const ProfileScreen = ({navigation}) => {
    const [studentInfo, setStudentInfo] = useState({
        displayName: 'Loading...',
        studentId: 'Loading...',
        email: 'Loading...',
        phoneNumber: 'Loading...',
        photoURL: 'Loading...',
    });

    const [image, setImage] = useState([]);

    const { updateUserDetails } = useUser();

    const [originalStudentInfo, setOriginalStudentInfo] = useState();

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useState(() => {
        const fetchUserData = async () => {
            return await getUser();
        }
        fetchUserData().then(
            (user) => {
                setOriginalStudentInfo(user)
                setStudentInfo({
                    uid: user.uid,
                    displayName: user.displayName,
                    studentId: user.studentId,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                });

                setIsLoading(false);
            },
            (error) => {
                console.log('Error retrieving user data:', error);
            }
        );
    });

    // Function to handle profile edit (to be implemented)
    const handleEditProfile = () => {
        originalStudentInfo.displayName = studentInfo.displayName;
        originalStudentInfo.phoneNumber = studentInfo.phoneNumber;
        dataStorage("userObject", originalStudentInfo).then(r => {
        });
        updateUserDetails(originalStudentInfo);
        setEditModalVisible(true);
    };

    function handleUpdate() {
        updateUserProfile(studentInfo).then(
            () => {
                console.log('User profile updated successfully');
                originalStudentInfo.photoURL = studentInfo.photoURL;
                dataStorage("userObject", originalStudentInfo).then(r => {
                });
                updateUserDetails(originalStudentInfo);
                setEditModalVisible(false);
            }
        );
    }


    const onImageSelect = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            mediaType: 'photo',
            allowsMultipleSelection: true,
            selectionLimit: 1
        });

        if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            uploadProfileImage(uri, studentInfo.uid).then((url) => {
                setStudentInfo({...studentInfo, photoURL: url});
                updateUserProfile(studentInfo).then(
                    () => {
                        console.log('User profile updated successfully');
                        setEditModalVisible(false);
                    }
                );

                dataStorage("userObject", studentInfo).then(r => {

                });
            }).catch((error) => {
                console.error("Error uploading image:", error);
            });
        }
    }

    if (isLoading) {
        return (
            <View style={Styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    return (
        <SafeAreaView style={Styles.screenContainer}>
            <ScrollView style={Styles.scrollView}>
                <View style={Styles.profileHeader}>
                    <Avatar.Image size={100} source={{ uri: studentInfo.photoURL }} style={Styles.avatar} />
                    <Title style={Styles.name}>{studentInfo.displayName}</Title>
                    <Paragraph style={Styles.studentId}>{studentInfo.studentId}</Paragraph>
                </View>

                <Card style={Styles.card}>
                    <Title style={Styles.title}>Contact Information</Title>
                    <Card.Content>
                        {/* Email Field */}
                        <View style={Styles.cardRow}>
                            <MaterialCommunityIcons name="email" size={20} style={Styles.cardIcon}/>
                            <Paragraph style={Styles.cardText}>Email: {studentInfo.email}</Paragraph>
                        </View>

                        {/* Phone Number Field */}
                        <View style={Styles.cardRow}>
                            <MaterialCommunityIcons name="phone" size={20} style={Styles.cardIcon}/>
                            <Paragraph style={Styles.cardText}>Phone: {studentInfo.phoneNumber}</Paragraph>
                        </View>
                    </Card.Content>
                </Card>


                <Button icon="account-edit" mode="outlined" onPress={handleEditProfile} style={Styles.button}>
                    Edit Profile
                </Button>

                {/* Edit Profile Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={() => {
                        setEditModalVisible(!editModalVisible);
                    }}
                >
                    <View style={Styles.modalView}>

                        <Title style={Styles.title}>Edit Profile</Title>
                        <View style={Styles.profileHeader}>
                            <TouchableOpacity onPress={onImageSelect} style={Styles.avatarContainer}>
                                <Avatar.Image size={100} source={{ uri: studentInfo.photoURL }} style={Styles.avatar} />
                                <View style={Styles.editIcon}>
                                    <MaterialCommunityIcons name="pencil" size={24} color="black"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <InputField label={'Email'} value={studentInfo.email} disabled={true}/>
                        <InputField label={'Student ID'} value={studentInfo.studentId + ""} disabled={true}/>
                        <InputField label={'Name'} value={studentInfo.displayName}
                                    onChangeText={(text) => setStudentInfo({...studentInfo, displayName: text})}/>
                        <InputField label={'Phone Number'} value={studentInfo.phoneNumber}
                                    keyboardType={'phone-pad'}
                                    maxLength={13}
                                    onChangeText={(text) => setStudentInfo({...studentInfo, phoneNumber: text})}/>

                        <View style={Styles.buttonContainer}>
                            <Button onPress={() => setEditModalVisible(false)} icon={'close'}
                                    mode={'outlined'}>Cancel</Button>
                            <Button onPress={handleUpdate} icon={'account-edit'} mode={'contained'}>Update</Button>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
