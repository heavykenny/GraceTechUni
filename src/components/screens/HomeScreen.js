import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Styles, {colorScheme} from "../../constants/styles";
import CourseDetailsScreen from "./CourseDetailsScreen";
import CustomHeader from "../common/CustomHeader";

const HomeScreen = ({navigation}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState({});

    const openModal = () => {
        // Set the selected course details here
        setSelectedCourse({
            degree: "BSc", // Degree type e.g., BSc, Masters
            name: "Computer Science",
            session: "2023-2024",
            modules: [{/* module details */}], // Array of module details
            duration: "4 years",
            faculty: "Social Sciences",
            isActive: true, // Studentship status: true for active, false for inactive
            department: "Psychology", // Department offering the course
            credits: 120, // Total credits required for the course
            gpa: 3.5 // Current GPA in the course
        });

        setIsModalVisible(true);
    };

    return (
        <SafeAreaView style={[Styles.screenContainer, {backgroundColor: colorScheme.background}]}>
            <CustomHeader
                title="Home"
            />
            <ScrollView style={Styles.scrollView} showsVerticalScrollIndicator={false} persistentScrollbar={false}>
                <Card style={Styles.card}>
                    <Card.Content>
                        <Title>Welcome to GraceTech University</Title>
                        <Paragraph>Stay updated with your academic information.</Paragraph>
                    </Card.Content>
                </Card>

                {/* Quick Access Section */}
                <Title style={Styles.sectionTitle}>Quick Access</Title>
                <Card style={Styles.card} onPress={openModal}>
                    <Card.Content>
                        <MaterialCommunityIcons name="school" size={24} style={Styles.icon}/>
                        <Title>Course Details</Title>
                        <Paragraph>View your course details</Paragraph>
                    </Card.Content>
                </Card>
                <View>
                    <CourseDetailsScreen
                        visible={isModalVisible}
                        hideModal={() => setIsModalVisible(false)}
                        courseDetails={selectedCourse}
                    />
                </View>
                <Card style={Styles.card} onPress={() => navigation.navigate('Modules')}>
                    <Card.Content>
                        <MaterialCommunityIcons name="book" size={24} style={Styles.icon}/>
                        <Title>Modules</Title>
                        <Paragraph>View your modules and grades</Paragraph>
                    </Card.Content>
                </Card>
                <Card style={Styles.card} onPress={() => navigation.navigate('GlobalTimeline')}>
                    <Card.Content>
                        <MaterialCommunityIcons name="account-group" size={24} style={Styles.icon}/>
                        <Title>Social Media</Title>
                        <Paragraph>Connect with your classmates</Paragraph>
                    </Card.Content>
                </Card>
                <Card style={Styles.card} onPress={() => navigation.navigate('Attendance Record')}>
                    <Card.Content>
                        <MaterialCommunityIcons name="calendar-check" size={24} style={Styles.icon}/>
                        <Title>Attendance</Title>
                        <Paragraph>View your attendance record</Paragraph>
                    </Card.Content>
                </Card>

                {/* Notifications Section */}
                <Title style={Styles.sectionTitle}>Notifications</Title>
                <Card style={Styles.card}>
                    <Card.Content>
                        <Paragraph>New assignment in Advanced Mathematics due next week</Paragraph>
                    </Card.Content>
                </Card>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
