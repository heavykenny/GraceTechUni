// import React, {useState} from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import AppNavigator from './AppNavigator';
// import DrawerContent from "../common/DrawerContent";
// import ScreenTitleContext from "../../context/ScreenTitleContext";
//
// const Drawer = createDrawerNavigator();
//
// const MainNavigator = () => {
//     const [screenTitle, setScreenTitle] = useState('Home');
//     return (
//         <ScreenTitleContext.Provider value={{screenTitle, setScreenTitle}}>
//             <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
//                 <Drawer.Screen name="App" component={AppNavigator} options={{headerTitle: screenTitle}}/>
//             </Drawer.Navigator>
//         </ScreenTitleContext.Provider>
//     );
// };
//
// export default MainNavigator;
