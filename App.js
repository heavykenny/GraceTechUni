import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AuthNavigator from './src/components/navigation/AuthNavigator';
import MainNavigator from './src/components/navigation/MainNavigator';
import {AuthProvider, useAuth} from './src/context/AuthContext';
import {UserProvider} from "./src/context/UserContext";
import AppNavigator from "./src/components/navigation/AppNavigator";

const AppContainer = () => {
    const {isAuthenticated} = useAuth();
    const theme = {
        ...DefaultTheme,
        // Customize your theme here
    };
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                {isAuthenticated ? <AppNavigator/> : <AuthNavigator/>}
            </NavigationContainer>
        </PaperProvider>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <AppContainer/>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;
