import React from 'react'
import { useUserContext } from "../../../context/UserContext"
// import { useProductContext } from '../../../context/ProductContext'

const Profile = () => {
    // const { eleman } = useProductContext()
    const { userInfo } = useUserContext()
    const { uid } = userInfo
    console.log(userInfo);
    console.log(uid);
    return (
        <div>
            {
                userInfo.providerData.map(user => (
                    <p key={user.uid}>{user.email}</p>

                ))
            }
            <div>
                
            </div>
        </div>
    )
}

export default Profile

// eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkNmJjOWRhMWFmMjM2Zj…Zn6c8QuiaKSutdGh2JSOAnJr2lmqoTHVQWXKiGBO3CqTyHxMA