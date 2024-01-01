import React, { useEffect, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import ProfileScreen from "../screens/ProfileScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import ModulesScreen from "../screens/ModulesScreen";
import StackNavigator from "./StackNavigator";
import { getUser } from "../../services/firebase/auth";
import AdminCreateCourseScreen from "../screens/AdminCreateCourseScreen";
import AdminCreateUserScreen from "../screens/AdminCreateUserScreen";

const AppNavigator = () => {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState({});

    const userRoutes = [
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'attendance', title: 'Attendance', focusedIcon: 'calendar-check', unfocusedIcon: 'calendar-check-outline' },
        { key: 'modules', title: 'Modules', focusedIcon: 'book', unfocusedIcon: 'book-outline' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    ];

    const adminRoutes = [
        { key: 'admin_course', title: 'Course', focusedIcon: 'book-plus', unfocusedIcon: 'book-plus-outline' },
        { key: 'admin_users', title: 'Students', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
        { key: 'admin_manage', title: 'Manage', focusedIcon: 'account-cog', unfocusedIcon: 'account-cog-outline' },
        { key: 'admin_profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    ];

    const [routes, setRoutes] = useState(userRoutes);

    useEffect(() => {
        const getUserDetails = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
            setRoutes(fetchedUser && fetchedUser.role === 'admin' ? adminRoutes : userRoutes);
        };
        getUserDetails().then(r => r);
    }, []);

    const handleIndexChange = (newIndex) => setIndex(newIndex);


    useEffect(() => {
        setRoutes(user.role === 'admin' ? adminRoutes : userRoutes);
    }, [user.role]);

    const renderScene = BottomNavigation.SceneMap({
        home: StackNavigator,
        profile: ProfileScreen,
        attendance: AttendanceScreen,
        modules: ModulesScreen,
        admin_course: AdminCreateCourseScreen,
        admin_users: AdminCreateUserScreen,
        admin_manage: ModulesScreen,
        admin_profile: ProfileScreen,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={handleIndexChange}
            renderScene={renderScene}
        />
    );
};

export default AppNavigator;
