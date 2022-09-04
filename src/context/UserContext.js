import { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext();
export const userProvider = ({ children }) => {


    const values = {


    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>)
}
export const useUserContext = () => useContext(UserContext)