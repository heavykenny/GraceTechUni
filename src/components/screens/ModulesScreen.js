import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import Styles from "../../constants/styles";
import CustomHeader from "../common/CustomHeader";

const CourseScreen = ({navigation}) => {
    const courses = [
        {
            id: '1',
            title: 'Introduction to Computer Science',
            description: 'An introductory course to computer science concepts.',
            // Add more fields as necessary
        },
        {
            id: '2',
            title: 'Advanced Mathematics',
            description: 'Deep dive into advanced mathematical theories.',
        },
    ];

    const renderCourse = ({item}) => (
        <Card style={Styles.card} onPress={() => handleCourseClick(item.id)}>
            <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
            </Card.Content>
        </Card>
    );

    const handleCourseClick = (courseId) => {
        console.log('Course Clicked:', courseId);
    };

    return (
        <SafeAreaView style={Styles.screenContainer}>
            <CustomHeader
                title="Modules"
            />
            <View style={Styles.scrollView}>
                <FlatList
                    data={courses}
                    renderItem={renderCourse}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};


export default CourseScreen;
