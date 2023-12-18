import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ModulesGradesScreen from "../screens/ModulesGradesScreen";
import CourseTimelineScreen from "../screens/CourseTimelineScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import GlobalTimelineScreen from "../screens/GlobalTimelineScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Modules" component={ModulesGradesScreen}/>
            <Stack.Screen name="CourseTimeline" component={CourseTimelineScreen}/>
            <Stack.Screen name="GlobalTimeline" component={GlobalTimelineScreen}/>
            <Stack.Screen name="CreatePost" component={CreatePostScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;
