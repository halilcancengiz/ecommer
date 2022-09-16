import React from 'react'
import Navbar from '../navbar/Navbar';
import "./userprofile.css"
import { Outlet } from 'react-router-dom';



const UserProfile = () => {
    
    return (
        <div style={{minHeight:"100vh"}}>
            <Navbar />
            <div className='outletContainer mx-auto h-100'>
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