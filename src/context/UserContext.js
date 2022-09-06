import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import alertify from "alertifyjs";
import { auth } from './../Firebase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"))
    console.log(isLoggedIn);


    const register = async (email, password) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            alertify.success("Registration Successful", 2)
            return user;
        } catch (error) {
            alertify.error(`${error}`);
        }
    }
    const login = async (email, password) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            alertify.success("Login successful", 2)
            return user;
        } catch (error) {
            alertify.error(`${error}`);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            return true;
        } catch (error) {
            alertify.error(error);
        }
    }

    const values = {
        register,
        login,
        logout,
        isLoggedIn,
        setIsLoggedIn,
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>)
}
export const useUserContext = () => useContext(UserContext)