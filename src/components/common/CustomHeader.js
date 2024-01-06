import React from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomHeader = ({title, onBackPress, showBackButton = false, rightComponent}) => {
    const insets = useSafeAreaInsets(); // Get safe area insets

    return (
        <View >
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
                {showBackButton && (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={24} color="black"/>
                    </TouchableOpacity>
                )}

                <Text style={styles.title}>{title}</Text>

                {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        elevation: 2,
    },
    backButton: {
        position: 'absolute',
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333', // Adjust color as needed
    },
    rightComponent: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CustomHeader;
