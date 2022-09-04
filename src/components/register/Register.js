import React, { useState } from 'react'
import { register } from '../../Firebase'
import "./register.css"

const Register = () => {

    const [userRegister, setUserRegister] = useState({
        email: "",
        password: "",
        rePassword: ""
    })
    const handleRegister = (e) => {
        setUserRegister({ ...userRegister, [e.target.name]: e.target.value })
    }

    const addUserToDb = async (e) => {
        e.preventDefault()
        const user = await register(userRegister.email, userRegister.password)
        console.log(user);
    }
    return (
        <div className='registerPageContainer d-flex align-items-center justify-content-center flex-column'>
            <form onSubmit={addUserToDb} className="d-flex align-items-center justify-content-center flex-column me-3">

                <div className="first mb-3">
                    <h3 id='registerHeader' className='text-uppercase text-white w-100 h-100'>Sign Up</h3>
                    <div className='secondHeader'></div><div className='thirdHeader'></div>
                </div>
                <div className="first mt-4">
                    <input onChange={handleRegister} value={userRegister.email} name="email" type="email" className='w-100 h-100' placeholder='E-mail' />
                    <div className='second'></div><div className='third'></div>
                </div>
                <div className="first mt-4">
                    <input onChange={handleRegister} value={userRegister.password} name="password" type="password" className='w-100 h-100' placeholder='Password' />
                    <div className='second'></div><div className='third'></div>
                </div>
                <div className="first mt-4">
                    <input onChange={handleRegister} value={userRegister.rePassword} name="rePassword" type="password" className='w-100 h-100' placeholder='Re-enter your password' />
                    <div className='second'></div><div className='third'></div>
                </div>
                <div className="first mt-4">
                    <button disabled={!userRegister.email || !userRegister.password || !userRegister.rePassword} type="submit" className='w-100 h-100'>Kayıt Ol</button>
                    <div className='secondBtn'></div><div className='thirdBtn'></div>
                </div>
            </form>
        </div>

    )
}

export default Register