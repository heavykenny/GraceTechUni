import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Appbar, Card, Divider, Modal, Paragraph, Portal, Text} from 'react-native-paper';
import Styles from "../../constants/styles";
import FAButton from "../common/FAButton";

const GlobalTimelineScreen = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(false);

    const courses = ['CS101', 'CS102', 'CS103', 'CS104', 'CS109']; // Sample courses
    const moreCourses = ['CS105', 'CS106', 'CS107', 'CS108']; // Additional courses for modal
    const globalTimelineData = [
        {
            id: '1',
            author: 'Diana Green',
            timestamp: '2023-03-04T15:45:00Z',
            content: 'Excited for the upcoming University Spring Fest! Looking forward to the music and food stalls.'
        },
        {
            id: '2',
            author: 'Ethan Hall',
            timestamp: '2023-03-05T18:00:00Z',
            content: 'Reminder: Scholarship applications for next semester are due next Friday!'
        },
        {
            id: '3',
            author: 'Fiona Brown',
            timestamp: '2023-03-06T20:30:00Z',
            content: 'Had a great time at the career fair today. Met some amazing companies and learned about internship opportunities.'
        },
        // Add more posts
    ];

    useEffect(() => {
        setPosts(globalTimelineData);
    }, []);

    const openCourseTimeline = (courseId) => {
        setVisible(false)
        navigation.navigate('CourseTimeline', {courseId});
    };

    // Render global posts
    const renderPost = ({item}) => (
        <Card style={Styles.card}>
            <Card.Title title={item.author} subtitle={item.timestamp}/>
            <Card.Content>
                <Paragraph>{item.content}</Paragraph>
            </Card.Content>
        </Card>
    );

    // Render courses for top navigation
    const renderCourseTab = (courseId, index) => (
        <View key={index}>
            <TouchableOpacity
                style={Styles.courseTab}
                onPress={() => openCourseTimeline(courseId)}
            >
                <Text style={Styles.courseTabText}>{courseId}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={Styles.screenContainer}>
            <View style={Styles.scrollView}>
                <Appbar.Header style={Styles.appbar} statusBarHeight={0} mode={'small'}>
                    <Appbar.BackAction style={Styles.backAction} onPress={() => navigation.goBack()}/>
                    <Appbar.Content titleStyle={Styles.appbarContent} title="Back"/>
                </Appbar.Header>
                <View style={Styles.courseTabsContainer}>
                    {courses.map(renderCourseTab)}
                    <TouchableOpacity style={Styles.courseTab} onPress={() => setVisible(true)}>
                        <Text style={Styles.courseTabText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={item => item.id.toString()}
                />


                <Portal>
                    <Modal visible={visible} onDismiss={() => setVisible(false)}
                           contentContainerStyle={Styles.modalContainer}>
                        <Card style={Styles.modalCard}>
                            <View style={Styles.modalContent}>
                                {moreCourses.map((course, index) => (
                                    <TouchableOpacity key={index} onPress={() => openCourseTimeline(course)}>
                                        <Text style={Styles.courseModalItem}>{course}</Text>
                                        <Divider/>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Card>
                    </Modal>
                </Portal>
            </View>

            <View style={{position: 'absolute', bottom: 0, right: 0}}>
                <FAButton
                    onPress={() => navigation.navigate('CreatePost', {context: 'global'})}
                    icon="pencil"
                />
            </View>
        </SafeAreaView>
    );
};


export default GlobalTimelineScreen;

