import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Styles, {colorScheme} from "../../constants/styles";
import CourseDetailsScreen from "./CourseDetailsScreen";
import CustomHeader from "../common/CustomHeader";
import {getUser} from "../../services/firebase/auth";
import UserModel from "../../models/UserModel";
import {getCourseDetails} from "../../services/firebase/course";
import MessageSnackBar from "../common/MessageSnackBar";

const HomeScreen = ({navigation}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [userModel, setUserModel] = useState(UserModel.fromJSON({}));

    const fetchUserData = useCallback(async () => {
        try {
            const user = await getUser();
            if (user) {
                const userData = UserModel.fromJSON(user);
                setUserModel(userData);
                if (userData.courseUid) {
                    const courseDetails = await getCourseDetails(userData.courseUid);
                    setSelectedCourse(courseDetails);
                } else {
                    // Handle case where no course is enrolled
                    setSelectedCourse('none');
                }
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const displayMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setIsMessageVisible(true);
    }

    useEffect(() => {
        fetchUserData().then(r => r);
    }, [fetchUserData]);

    const openModal = () => {
        if (selectedCourse === 'none') {
            displayMessage('You are not enrolled in any course', 'error');
        } else {
            setIsModalVisible(true);
        }
    };

    if (isLoading) return (<View style={Styles.container}>
        <ActivityIndicator size="large" color="#0000ff"/>
    </View>);

    return (<SafeAreaView style={[Styles.screenContainer]}>
        <CustomHeader
            title="Home"
        />
        <MessageSnackBar visible={isMessageVisible} onDismiss={() => setIsMessageVisible(false)}
                         message={message} type={messageType}/>
        <ScrollView
            showsVerticalScrollIndicator={false}
            persistentScrollbar={false}
            style={{paddingHorizontal: 10}}
        >
            <Card style={Styles.card}>
                <Card.Content>
                    <Title>Welcome to GraceTech University</Title>
                    <Paragraph>Stay updated with your academic information.</Paragraph>
                    <Paragraph style={{fontStyle: 'italic'}}>You are logged in as a {userModel.role}</Paragraph>
                </Card.Content>
            </Card>

            {/* Quick Access Section */}
            <Title style={Styles.sectionTitle}>Quick Access</Title>
            {userModel.role === 'student' && (<Card style={Styles.card} onPress={openModal}>
                    <Card.Content>
                        <MaterialCommunityIcons name="school" size={24} style={Styles.icon}/>
                        <Title>Course Details</Title>
                        <Paragraph>View your course details</Paragraph>
                    </Card.Content>
                </Card>)}
            {userModel.role === 'student' && (
                <CourseDetailsScreen
                    visible={isModalVisible}
                    hideModal={() => setIsModalVisible(false)}
                    courseDetails={selectedCourse}
                />
            )}
            {userModel.role === 'student' && (<Card style={Styles.card} onPress={() => navigation.navigate('Modules')}>
                <Card.Content>
                    <MaterialCommunityIcons name="book" size={24} style={Styles.icon}/>
                    <Title>Modules</Title>
                    <Paragraph>View your modules and grades</Paragraph>
                </Card.Content>
            </Card>)}
            <Card style={Styles.card} onPress={() => navigation.navigate('GlobalTimeline')}>
                <Card.Content>
                    <MaterialCommunityIcons name="account-group" size={24} style={Styles.icon}/>
                    <Title>Social Media</Title>
                    <Paragraph>Connect with your classmates</Paragraph>
                </Card.Content>
            </Card>
            {userModel.role === 'student' && (
                <Card style={Styles.card} onPress={() => navigation.navigate('Attendance')}>
                    <Card.Content>
                        <MaterialCommunityIcons name="calendar-check" size={24} style={Styles.icon}/>
                        <Title>Attendance</Title>
                        <Paragraph>View your attendance record</Paragraph>
                    </Card.Content>
                </Card>)}

            {/* Notifications Section */}
            {/*<Title style={Styles.sectionTitle}>Notifications</Title>*/}
            {/*<Card style={Styles.card}>*/}
            {/*    <Card.Content>*/}
            {/*        <Paragraph>New assignment in Advanced Mathematics due next week</Paragraph>*/}
            {/*    </Card.Content>*/}
            {/*</Card>*/}

        </ScrollView>
    </SafeAreaView>);
};

export default HomeScreen;
