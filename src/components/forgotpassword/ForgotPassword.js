/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import "./forgotpassword.css"
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import alertify from 'alertifyjs';


const ForgotPassword = () => {
    const { forgotPassword, setCurrentProsses } = useUserContext()
    const [email, setEmail] = useState("")
    let emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmitForgotPassword = (e) => {
        e.preventDefault()
        if (email === "") {
            alertify.error("E-posta Adresi Boş Bırakılamaz")
        }
        else if (!emailValidation.test(email)) {
            alertify.error("Lütfen Geçerli Bir E-posta Adresi Girin")
        }
        else {
            forgotPassword(email)
            alertify.success("Mail Adresinizi Kontrol Edin. Mail spam kutusuna Düşmüş olabilir.")
            setCurrentProsses(true)
        }
    }
    return (
        <div style={{ minHeight: "100vh" }} className="forgotPasswordPageContainer d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmitForgotPassword} className='forgotPasswordContainer bg-white px-5 d-flex align-items-start justify-content-center flex-column'>
                <p className='p-0 m-0 fs-5 mx-auto'>Lütfen E-posta Adresini girin.</p>
                <div className='d-flex align-items-center my-3'>
                    <i className="fa-solid fa-envelope fs-6"></i>
                    <input onChange={(e) => setEmail(e.target.value)} className='w-100 ps-3' type="text" name='email' value={email} placeholder="E-posta" />
                </div>
                <button className='w-100 border-0 bg-dark text-white'>Gönder</button>
                <NavLink className="mx-auto mt-3 text-decoration-none" to="/membership">Back To Login Page</NavLink>
            </form>
        </div>

    )
}

export default ForgotPassword