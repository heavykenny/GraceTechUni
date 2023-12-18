import React, {useContext, useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import ProfileScreen from "../screens/ProfileScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import CourseScreen from "../screens/CourseScreen";
import ScreenTitleContext from "../../context/ScreenTitleContext";
import StackNavigator from "./StackNavigator";

const AppNavigator = () => {
    const [index, setIndex] = useState(0);
    const {setScreenTitle} = useContext(ScreenTitleContext);
    const handleIndexChange = (newIndex) => {
        setIndex(newIndex);
        const screenTitle = routes[newIndex].title;
        setScreenTitle(screenTitle);
    };
    const [routes] = useState([
        {key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
        {key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline'},
        {
            key: 'attendance',
            title: 'Attendance',
            focusedIcon: 'calendar-check',
            unfocusedIcon: 'calendar-check-outline'
        },
        {key: 'courses', title: 'Courses', focusedIcon: 'book', unfocusedIcon: 'book-outline'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: StackNavigator,
        profile: ProfileScreen,
        attendance: AttendanceScreen,
        courses: CourseScreen,
    });

    return (
        <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={handleIndexChange}
            renderScene={renderScene}
        />
    );
};

export default AppNavigator;
