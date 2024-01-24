import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

const FAButton = ({onPress, icon = 'plus', label = ''}) => {
    return (<FAB
        icon={icon}
        label={label}
        onPress={onPress}
        iconMode={'static'}
        style={[styles.fabStyle]}
        extended/>);
};

export default FAButton;

const styles = StyleSheet.create({
    fabStyle: {
        position: 'absolute', margin: 16, right: 0, bottom: 0,
    },
});
