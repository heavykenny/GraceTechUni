import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {userCreatePost} from "../../services/firebase/post";
import {getUser} from "../../services/firebase/auth";
import Styles from "../../constants/styles";
import {Appbar} from "react-native-paper";

const CreatePostScreen = ({route, navigation}) => {
    const [postContent, setPostContent] = useState('');
    let {context, courseId} = route.params;
    const isCourseTimeline = context === 'course';
    courseId = courseId || '';
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser();
                setUser(user);
            } catch (error) {
                console.error("Error loading data: ", error);
            }
        };
        fetchData().then(r => r);
    }, []);

    const handlePostSubmit = () => {
        const postData = {
            content: postContent, isCourseTimeline, courseId, userUid: user.uid,
        };
        userCreatePost(postData).then(r => r);
        navigation.goBack();
        // refresh the timeline
    };

    return (<View style={styles.container}>
        <Appbar.Header style={Styles.appbar} statusBarHeight={0} mode={'small'}>
            <Appbar.BackAction style={Styles.backAction} onPress={() => navigation.goBack()}/>
            <Appbar.Content titleStyle={Styles.appbarContent} title="Back"/>
        </Appbar.Header>
        <TextInput
            style={styles.textInput}
            multiline
            placeholder="What's on your mind?"
            value={postContent}
            onChangeText={setPostContent}
        />
        <Button title="Post" onPress={handlePostSubmit}/>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 10,
    }, textInput: {
        height: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, textAlignVertical: 'top',
    }, // Add more styles as needed
});

export default CreatePostScreen;
