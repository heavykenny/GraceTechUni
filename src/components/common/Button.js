import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

const Button = ({mode, style, ...props}) => {
    let buttonStyle = {margin: 5};
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

    return <PaperButton mode={mode} style={buttonStyle} {...props} />;
};

const styles = {
    text: {
        // Style for text button
    },
    outlined: {
        // Style for outlined button
    },
    contained: {
        // Style for contained button
    },
    elevated: {
        // Style for elevated button (may need to adjust elevation/shadow)
    },
    containedTonal: {
        // Style for contained-tonal button
    }
};

export default Button;

// Usage:
// <Button icon="camera" mode="contained" style={{ backgroundColor: 'blue', borderRadius: 10 }} onPress={handleLogin}>Login</Button>
