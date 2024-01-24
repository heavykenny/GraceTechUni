import React from 'react';
import {Snackbar, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const MessageSnackBar = ({visible, onDismiss, message, type = 'error'}) => {
    let backgroundColor = type === 'error' ? '#d32f2f' : '#43a047'; // Red for error, green for success

    return (<View style={styles.container}>
            <Snackbar
                visible={visible}
                onDismiss={onDismiss}
                duration={3000}
                style={{backgroundColor: backgroundColor}}>
                <View><Text style={styles.text}>{message}</Text></View>
            </Snackbar>
        </View>);
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10, justifyContent: 'space-between',
    }, text: {
        color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center',
    },
});

export default MessageSnackBar;
