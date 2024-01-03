import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Appbar, Card, Divider, Modal, Paragraph, Portal, Text} from 'react-native-paper';
import Styles from "../../constants/styles";
import FAButton from "../common/FAButton";
import {getAllCourses} from "../../services/firebase/course";
import {getGlobalTimelineData} from "../../services/firebase/post";
import {getAllUsers} from "../../services/firebase/user";
import {convertTimestamp} from "../../utils/helpers";
import {useFocusEffect} from "@react-navigation/native";

const GlobalTimelineScreen = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(false);

    const [courses, setCourses] = useState([]);
    const [first5courses, setFirst5Courses] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const moreCourses = courses.slice(5, courses.length);

    const fetchData = async () => {
        try {
            const [users, courses, timelineData] = await Promise.all([getAllUsers(), getAllCourses(), getGlobalTimelineData(),]);
            setAllUsers(users);
            setCourses(courses);
            setFirst5Courses(courses.slice(0, 5));
            setPosts(timelineData);
        } catch (error) {
            console.error("Error loading data: ", error);
        }
    };

    // Call fetchData when the screen comes into focus
    useFocusEffect(React.useCallback(() => {
        fetchData().then(r => r);
        // Optional: Return a function that specifies any cleanup actions
    }, []));

    useEffect(() => {
        fetchData().then(r => r);
    }, []);

    const openCourseTimeline = (courseId) => {
        setVisible(false);
        navigation.navigate('CourseTimeline', {courseId: courseId});
    };

    const filterUser = (userUid) => {
        return allUsers.find((user) => user.uid === userUid) || {};
    }

    const renderEmptyPosts = () => (<View style={Styles.emptyCoursesContainer}>
        <Text style={Styles.emptyCoursesText}>There are no posts available.</Text>
    </View>);

    // Render global posts
    const renderPost = ({item}) => (<Card style={Styles.card}>
        <Card.Title title={filterUser(item.userUid).displayName}
                    subtitle={convertTimestamp(item.createdAt).toLocaleString()}/>
        <Card.Content>
            <Paragraph>{item.content}</Paragraph>
        </Card.Content>
    </Card>);

    // Render courses for top navigation
    const renderCourseTab = (courseId, index) => (<View key={index}>
        <TouchableOpacity
            style={Styles.courseTab}
            onPress={() => openCourseTimeline(courseId)}
        >
            <Text style={Styles.courseTabText}>{courseId}</Text>
        </TouchableOpacity>
    </View>);

    return (<SafeAreaView style={Styles.screenContainer}>
        <View style={Styles.scrollView}>
            <Appbar.Header style={Styles.appbar} statusBarHeight={0} mode={'small'}>
                <Appbar.BackAction style={Styles.backAction} onPress={() => navigation.goBack()}/>
                <Appbar.Content titleStyle={Styles.appbarContent} title="Back"/>
            </Appbar.Header>
            <View style={Styles.courseTabsContainer}>
                {first5courses.map((course, index) => renderCourseTab(course.courseCode, index))}
                <TouchableOpacity style={Styles.courseTab} onPress={() => setVisible(true)}>
                    <Text style={Styles.courseTabText}>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={item => item.id}
                ListEmptyComponent={renderEmptyPosts}
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
                                </TouchableOpacity>))}
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
    </SafeAreaView>);
};

export default GlobalTimelineScreen;

