import React from 'react'
import Navbar from '../navbar/Navbar';
import { useUserContext } from '../../context/UserContext';
import "./userprofile.css"
import { Outlet } from 'react-router-dom';



const UserProfile = () => {
    const { userInfo } = useUserContext()
    const { uid } = userInfo
    console.log(userInfo);
    console.log(uid);

    return (
        <div>
            <Navbar />
            <div className='outletContainer mx-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserProfile


// {userInfo &&
//     userInfo.providerData.map(user => (
//         user.email
//     ))
// }