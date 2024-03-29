import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import Styles from "../../constants/styles";
import FAButton from "../common/FAButton";
import {getCourseTimelineData} from "../../services/firebase/post";
import {useFocusEffect} from "@react-navigation/native";
import {getAllUsers} from "../../services/firebase/user";
import PostComponent from "../common/PostComponent";

const CourseTimelineScreen = ({navigation, route}) => {
    const [posts, setPosts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const {courseId} = route.params;

    useEffect(() => {
        fetchData().then(r => r);
    }, [courseId]);

    // This is to refresh the data when the screen is focused
    useFocusEffect(React.useCallback(() => {
        fetchData().then(r => r);
    }, [courseId]));

    // This is to fetch the data from the database
    const fetchData = async () => {
        try {
            const [users, timelineData] = await Promise.all([getAllUsers(), getCourseTimelineData(courseId),]);
            setAllUsers(users);
            setPosts(timelineData);
        } catch (error) {
            console.error("Error loading data: ", error);
        }
    };

    // This is to filter the user data
    const filterUser = (userUid) => {
        return allUsers.find((user) => user.uid === userUid) || {};
    };

    // This is to render the empty posts
    const renderEmptyPosts = () => (<View style={Styles.emptyCoursesContainer}>
        <Text style={Styles.emptyCoursesText}>There are no posts available for this course.</Text>
    </View>);

    // This is to render the posts
    const renderPost = ({item}) => (<PostComponent item={item} user={filterUser(item.userUid)}/>);

    // This is to render the screen
    return (<SafeAreaView style={Styles.screenContainer}>
        <View style={Styles.scrollView}>
            <Appbar.Header style={Styles.appbar} statusBarHeight={0} mode={'small'}>
                <Appbar.BackAction style={Styles.backAction} onPress={() => navigation.goBack()}/>
                <Appbar.Content titleStyle={Styles.appbarContent} title="Course Timeline"/>
            </Appbar.Header>
        </View>
        <FlatList
            showsVerticalScrollIndicator={false}
            style={Styles.scrollView}
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={renderEmptyPosts}
        />
        <View style={{position: 'absolute', bottom: 0, right: 0}}>
            <FAButton
                onPress={() => navigation.navigate('CreatePost', {context: 'course', courseId})}
                icon="pencil"
            />
        </View>
    </SafeAreaView>);
};

export default CourseTimelineScreen;
