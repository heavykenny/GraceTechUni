import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    const updateUserDetails = (newDetails) => {
        setUserDetails(newDetails);
    };

    return (
        <UserContext.Provider value={{ userDetails, updateUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};
