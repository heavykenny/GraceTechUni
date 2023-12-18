import React, {useEffect, useState} from 'react';
import {Avatar, Drawer} from 'react-native-paper';
import {ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import Styles from "../../constants/styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useAuth} from "../../context/AuthContext";
import {getUser} from "../../services/firebase/auth";
import {dataRemove, roles} from "../../constants/functions";

const DrawerContent = ({navigation}) => {
    const [userDetails, setUserDetails] = useState(null);
    const {logout} = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUser();
                if (user) {
                    setUserDetails({
                        name: user.displayName || 'N/A',
                        studentId: user.studentId || 'N/A',
                        email: user.email || 'N/A',
                        phoneNumber: user.phoneNumber || 'N/A',
                        photoURL: user.photoURL || 'https://i.imgur.com/7k12EPD.png',
                        role: user.role || roles.STUDENT,
                    });
                }
            } catch (error) {
                console.log('Error retrieving user data:', error);
            }
        };
        fetchUserData().then(r => {
        });
    }, [userDetails]);

    const handlePress = (screen) => {
        navigation.navigate(screen);
    };

    if (!userDetails) {
        return <ActivityIndicator style={Styles.container} size="large"/>;
    }

    function logoutUser() {
        dataRemove('userObject').then(
            () => {
                console.log('User logged out successfully');
                logout();
            },
            (error) => {
                console.log('Error logging out user:', error);
            }
        );
    }

    return (
        <SafeAreaView style={Styles.screenContainer}>
            <Drawer.Section showDivider={false}>
                <View style={Styles.drawerHeader}>
                    <Avatar.Image size={50} source={{uri: userDetails.photoURL}}/>
                    <View style={Styles.userInfo}>
                        <Text style={Styles.userName}>{userDetails.name}</Text>
                        <Text style={Styles.userId}>ID: {userDetails.studentId}</Text>
                        <Text style={Styles.userEmail}>Email: {userDetails.email}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handlePress('Profile')}>
                        <MaterialCommunityIcons name="cog" size={24}/>
                    </TouchableOpacity>
                </View>

                <Drawer.Item
                    label="Go Home"
                    icon="home"
                    onPress={() => handlePress('Home')}
                />

                {/* Admin Privileges - show only if user is admin */}
                <Drawer.Section title="Admin Privileges"
                                style={userDetails.role === roles.ADMIN ? {} : {display: 'none'}}>
                    <Drawer.Item
                        label="Enrol New Student"
                        icon="account-plus"
                        onPress={() => handlePress('EnrolStudent')}
                    />
                    <Drawer.Item
                        label="Enrol Student on Course"
                        icon="book-plus"
                        onPress={() => handlePress('EnrolCourse')}
                    />
                    <Drawer.Item
                        label="Delete Student"
                        icon="account-remove"
                        onPress={() => handlePress('DeleteStudent')}
                    />
                    <Drawer.Item
                        label="Update Student Details"
                        icon="account-edit"
                        onPress={() => handlePress('UpdateStudent')}
                    />
                    <Drawer.Item
                        label="View Student Details"
                        icon="account-search"
                        onPress={() => handlePress('ViewStudent')}
                    />
                </Drawer.Section>

                {/* Student Privileges - show only if user is student */}
                <Drawer.Section title="Student Privileges"
                                style={userDetails.role === roles.STUDENT ? {} : {display: 'none'}}>
                    <Drawer.Item
                        label="Update Profile"
                        icon="account-cog"
                        onPress={() => handlePress('Profile')}
                    />
                    <Drawer.Item
                        label="Post Comment"
                        icon="comment"
                        onPress={() => handlePress('PostComment')}
                    />
                </Drawer.Section>

                {/* Additional Items */}
                <Drawer.Item
                    label="Logout"
                    icon="logout"
                    onPress={() => logoutUser()}
                />

                <Drawer.Item
                    label="Settings"
                    icon="cog"
                    onPress={() => handlePress('ProfileScreen')}
                />
                <Drawer.Item
                    label="Contact"
                    icon="phone"
                    onPress={() => handlePress('Contact')}
                />
                <Drawer.Item
                    label="Report"
                    icon="alert-circle"
                    onPress={() => handlePress('Report')}
                />
            </Drawer.Section>
        </SafeAreaView>
    );
}

export default DrawerContent;
