// ScreenTitleContext.js
import React from 'react';

const ScreenTitleContext = React.createContext({
    screenTitle: '',
    setScreenTitle: () => {}
});

export default ScreenTitleContext;
