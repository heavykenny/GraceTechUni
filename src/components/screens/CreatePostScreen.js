import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import InputField from "../common/InputField";
import CustomButton from "../common/CustomButton";
import MessageSnackBar from "../common/MessageSnackBar";
import Styles from "../../constants/styles";
import {getUser} from "../../services/firebase/auth";
import {userCreatePost} from "../../services/firebase/post";

const CreatePostScreen = ({route, navigation}) => {
    const [postContent, setPostContent] = useState('');
    const [user, setUser] = useState(null);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const {context, courseId = ''} = route.params;
    const isCourseTimeline = context === 'course';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.error("Error loading user data: ", error);
            }
        };
        fetchData().then(r => r);
    }, []);

    const handlePostSubmit = async () => {
        if (postContent.trim().length < 1) {
            setIsMessageVisible(true);
            setMessage('Please enter some content');
            setMessageType('error');
            return;
        }

        const postData = {
            content: postContent, isCourseTimeline, courseId, userUid: user?.uid,
        };

        try {
            await userCreatePost(postData);
            navigation.goBack();
        } catch (error) {
            console.error("Error creating post: ", error);
            setMessage('Failed to create post');
            setMessageType('error');
            setIsMessageVisible(true);
        }
    };

    return (<View style={Styles.createPostContainer}>
        <Appbar.Header style={Styles.appbar}>
            <Appbar.BackAction onPress={() => navigation.goBack()}/>
            <Appbar.Content titleStyle={Styles.appbarContent} title="Create Post"/>
        </Appbar.Header>
        <MessageSnackBar
            visible={isMessageVisible}
            onDismiss={() => setIsMessageVisible(false)}
            message={message}
            type={messageType}
        />
        <View style={Styles.scrollView}>
            <InputField
                value={postContent}
                onChangeText={setPostContent}
                multiline
                placeholder="What's on your mind?"
                style={Styles.textInput}
            />
            <CustomButton mode={'outlined'} onPress={handlePostSubmit}>Post</CustomButton>
        </View>
    </View>);
};

export default CreatePostScreen;
