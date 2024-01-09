import React, {useEffect, useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import ProfileScreen from "../screens/ProfileScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import ModulesScreen from "../screens/ModulesScreen";
import StackNavigator from "./StackNavigator";
import {getUser} from "../../services/firebase/auth";
import AdminCreateCourseScreen from "../screens/AdminCreateCourseScreen";
import AdminCreateUserScreen from "../screens/AdminCreateUserScreen";
import Styles from "../../constants/styles";
import ModulesGradesScreen from "../screens/ModulesGradesScreen";
import AdminCreateLecturerScreen from "../screens/AdminCreateLecturerScreen";
import {ActivityIndicator, View} from "react-native";
import LecturerAttendanceScreen from "../screens/LecturerAttendanceScreen";

const AppNavigator = () => {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const userRoutes = [{
        key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'
    }, {
        key: 'attendance', title: 'Attendance', focusedIcon: 'calendar-check', unfocusedIcon: 'calendar-check-outline'
    }, {key: 'modules', title: 'Modules', focusedIcon: 'book', unfocusedIcon: 'book-outline'}, {
        key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline'
    },];

    const adminRoutes = [{
        key: 'admin_course', title: 'Course', focusedIcon: 'book-plus', unfocusedIcon: 'book-plus-outline'
    }, {
        key: 'admin_users', title: 'Students', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline'
    }, {
        key: 'admin_lecturer', title: 'Lecturer', focusedIcon: 'account-tie', unfocusedIcon: 'account-tie-outline'
    }, {
        key: 'admin_manage', title: 'Attendance', focusedIcon: 'account-cog', unfocusedIcon: 'account-cog-outline'
    }, {key: 'admin_profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline'},];


    const lecturerRoutes = [{
        key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'
    }, {
        key: 'lecturer_attendance',
        title: 'Attendance',
        focusedIcon: 'account-cog',
        unfocusedIcon: 'account-cog-outline'
    },{
        key: 'lecturer_modules', title: 'Modules', focusedIcon: 'book', unfocusedIcon: 'book-outline'
    }, {key: 'lecturer_profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline'}];

    const [routes, setRoutes] = useState(userRoutes);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                setIsLoading(true);
                const user = await getUser();
                setUser(user);
                setRoutes(user.role === 'admin' ? adminRoutes : userRoutes);
                if (user.role === 'admin') {
                    setRoutes(adminRoutes);
                } else if (user.role === 'lecturer') {
                    setRoutes(lecturerRoutes);
                } else {
                    setRoutes(userRoutes);
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getUserDetails().then(r => r);
    }, []);

    const handleIndexChange = (newIndex) => setIndex(newIndex);

    const renderScene = BottomNavigation.SceneMap({
        home: StackNavigator,
        profile: ProfileScreen,
        attendance: AttendanceScreen,
        modules: ModulesGradesScreen,
        admin_course: AdminCreateCourseScreen,
        admin_users: AdminCreateUserScreen,
        admin_lecturer: AdminCreateLecturerScreen,
        admin_manage: ModulesScreen,
        admin_profile: ProfileScreen,
        lecturer_attendance: LecturerAttendanceScreen,
        lecturer_modules: ModulesScreen,
        lecturer_profile: ProfileScreen,
    });

    if (isLoading) return (<View style={Styles.container}>
        <ActivityIndicator size="large" color="#0000ff"/>
    </View>);

    return (<BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
    />);
};

export default AppNavigator;
