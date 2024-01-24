import React from 'react';
import {TextInput} from 'react-native-paper';

const InputField = ({label, value, onChangeText, secureTextEntry, ...props}) => {
    return (<TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            {...props}
        />);
};

export default InputField;
