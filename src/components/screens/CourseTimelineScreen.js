import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {Appbar, Card, Paragraph} from 'react-native-paper';
import Styles from "../../constants/styles";
import FAButton from "../common/FAButton";

const CourseTimelineScreen = ({navigation, courseId}) => {
    const [posts, setPosts] = useState([]);

    const courseTimelineData = [
        {
            id: '1',
            author: 'Alice Smith',
            timestamp: '2023-03-01T10:00:00Z',
            content: 'Really enjoyed today’s lecture on neural networks. Excited to apply this in our upcoming project!',
            courseId: 'CS101'
        },
        {
            id: '2',
            author: 'Bob Johnson',
            timestamp: '2023-03-02T11:30:00Z',
            content: 'Can anyone help me with the assignment question on binary trees?',
            courseId: 'CS101'
        },
        {
            id: '3',
            author: 'Charlie Davis',
            timestamp: '2023-03-03T09:20:00Z',
            content: 'Great class discussion on AI ethics. It’s important to consider the societal impacts of technology.',
            courseId: 'CS101'
        },
        // Add more posts
    ];


    useEffect(() => {
        // Fetch posts for the specific course using courseId
        setPosts(courseTimelineData)
    }, [courseId]);

    const renderPost = ({item}) => (
        <Card style={Styles.card}>
            <Card.Title title={item.author} subtitle={item.timestamp}/>
            <Card.Content>
                <Paragraph>{item.content}</Paragraph>
            </Card.Content>
            {/* Add buttons for like, comment, share, etc. */}
        </Card>
    );

    return (
        <SafeAreaView style={Styles.screenContainer}>
            <View style={Styles.scrollView}>
                <Appbar.Header style={Styles.appbar} statusBarHeight={0} mode={'small'}>
                    <Appbar.BackAction style={Styles.backAction} onPress={() => navigation.goBack()}/>
                    <Appbar.Content titleStyle={Styles.appbarContent} title="Back"/>
                </Appbar.Header>
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={item => item.id.toString()}
                />
            </View>

            <View style={{position: 'absolute', bottom: 0, right: 0}}>
                <FAButton
                    onPress={() => navigation.navigate('CreatePost', {context: 'course', courseId})}
                    icon="pencil"
                />
            </View>
        </SafeAreaView>
    );
};

export default CourseTimelineScreen;
