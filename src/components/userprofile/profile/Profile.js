import React from 'react'
import { useUserContext } from "../../../context/UserContext"
// import { useProductContext } from '../../../context/ProductContext'

const Profile = () => {
    // const { eleman } = useProductContext()
    const { userInfo } = useUserContext()
    console.log(userInfo);

    return (
        <div>
            {
                userInfo && userInfo.providerData.map((user,index) => (
                    <p key={index}>{user.email}</p>

                ))
            }
        </div>
    )
}

export default Profile

// eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkNmJjOWRhMWFmMjM2Zj…Zn6c8QuiaKSutdGh2JSOAnJr2lmqoTHVQWXKiGBO3CqTyHxMA