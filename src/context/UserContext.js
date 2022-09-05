import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import alertify from "alertifyjs";
import { auth } from './../Firebase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"))
    console.log(isLoggedIn);
    
    useEffect(() => {

    },[isLoggedIn])

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

    const signOut = () => {
        try {
            signOut(auth)
        } catch (error) {
            console.log(error);
        }
    }

    const values = {
        register,
        login,
        signOut,
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>)
}
export const useUserContext = () => useContext(UserContext)