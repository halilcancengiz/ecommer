import { createContext, useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import alertify from "alertifyjs";
import { auth } from './../Firebase';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    let navigate = useNavigate();

    const [currentProsses, setCurrentProsses] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"))
    const [userInfo,setUserInfo]=useState(JSON.parse(localStorage.getItem("currentUser")))
    
    const visitor = [{
        uid: 0,
        providerData: [{
            email: "visitor.profile@gmail.com"
        }]
    }]


    const register = async (email, password) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            alertify.success("Registration Successful", 2)
            navigate("/membership", { replace: true })
            setCurrentProsses(true)
            return user;
        } catch (error) {
            alertify.error(`${error}`);
        }
    }
    const login = async (email, password) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            alertify.success("Login successful", 2)
            localStorage.setItem("currentUser", JSON.stringify(user))
            localStorage.setItem("isLoggedIn", "true")
            setIsLoggedIn("true")
            navigate("/", { replace: true });
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

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email,{url:'http://localhost:3000/membership'})
    }

    const values = {
        register,
        login,
        logout,
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        visitor,
        forgotPassword,
        currentProsses,
        setCurrentProsses,
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>)
}
export const useUserContext = () => useContext(UserContext)