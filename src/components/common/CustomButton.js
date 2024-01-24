import React from 'react';
import {Button as PaperButton} from 'react-native-paper';
import {colorScheme} from "../../constants/styles";

const CustomButton = ({mode, style, ...props}) => {
    let buttonStyle = {margin: 5, borderRadius: 10, color: colorScheme.white};
    // Setting button style based on mode
    switch (mode) {
        case 'outlined':
            buttonStyle = {...buttonStyle, ...styles.outlined};
            break;
        case 'contained':
            buttonStyle = {...buttonStyle, ...styles.contained};
            break;
        case 'elevated':
            buttonStyle = {...buttonStyle, ...styles.elevated};
            break;
        case 'contained-tonal':
            buttonStyle = {...buttonStyle, ...styles.containedTonal};
            break;
        case 'text':
        default:
            buttonStyle = {...buttonStyle, ...styles.text};
    }

    // Merging passed-in styles
    buttonStyle = {...buttonStyle, ...style};

    return <PaperButton mode={mode} style={buttonStyle} labelStyle={buttonStyle} {...props} children={props.children}/>;
};

const styles = {
    text: {
        color: colorScheme.black
    }, outlined: {
        borderColor: colorScheme.blue, color: colorScheme.blue
    }, contained: {
        backgroundColor: colorScheme.blue
    }, elevated: {}, containedTonal: {}
};

export default CustomButton;
