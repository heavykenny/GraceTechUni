import React from 'react';
import {Image, StyleSheet} from 'react-native';
// expo-image-picker

const ProfilePicture = ({uri, size}) => {
    return (
        <Image
            source={{uri}}
            style={[styles.image, {width: size, height: size, borderRadius: size / 2}]}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        margin: 10
    }
});

export default ProfilePicture;
