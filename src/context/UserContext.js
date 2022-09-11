import { createContext, useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import alertify from "alertifyjs";
import { auth } from './../Firebase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"))
    const visitor = [{
        uid: 0,
        providerData: [{
            email: "visitor.profile@gmail.com"
        }]
    }]
    const userInfo = JSON.parse(localStorage.getItem("currentUser"))


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
        userInfo,
        visitor
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>)
}
export const useUserContext = () => useContext(UserContext)