import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

const CreatePostScreen = ({route, navigation}) => {
    const [postContent, setPostContent] = useState('');
    const {isCourseTimeline} = route.params;

    const handlePostSubmit = () => {
        // Submit the post to the backend.
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                multiline
                placeholder="What's on your mind?"
                value={postContent}
                onChangeText={setPostContent}
            />
            <Button title="Post" onPress={handlePostSubmit}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textInput: {
        height: 150,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    // Add more styles as needed
});

export default CreatePostScreen;
