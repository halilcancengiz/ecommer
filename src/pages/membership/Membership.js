import React, { useState, memo, useRef } from 'react'
import { useUserContext } from '../../context/UserContext'
import "./membership.css"
import { NavLink } from 'react-router-dom';


const Register = () => {

    const { register, login, currentProsses, setCurrentProsses } = useUserContext()
    const visibleSignUpPasswordRef = useRef()
    const visibleSignUpRePasswordRef = useRef()
    const visibleSignInPasswordRef = useRef()
    const toggleSignUpRef = useRef()
    const toggleSignInRef = useRef()
    const [visibleSignUpPassword, setVisiblePassword] = useState(false)
    const [visibleSignUpRePassword, setVisibleRePassword] = useState(false)
    const [visibleSignInPassword, setVisibleSignInRePassword] = useState(false)

    const [userRegister, setUserRegister] = useState({
        signupemail: "",
        signuppassword: "",
        signuprePassword: ""
    })
    const [userLogin, setUserLogin] = useState({
        signinemail: "",
        signinpassword: ""
    })

    const handleVisibleSignUpPassword = () => {
        setVisiblePassword(!visibleSignUpPassword)
        visibleSignUpPassword === false ? visibleSignUpPasswordRef.current.type = "text" : visibleSignUpPasswordRef.current.type = "password"
    }
    const handleVisibleSignUpRePassword = () => {
        setVisibleRePassword(!visibleSignUpRePassword)
        visibleSignUpRePassword === false ? visibleSignUpRePasswordRef.current.type = "text" : visibleSignUpRePasswordRef.current.type = "password"
    }
    const handleVisibleSignInPassword = () => {
        setVisibleSignInRePassword(!visibleSignInPassword)
        visibleSignInPassword === false ? visibleSignInPasswordRef.current.type = "text" : visibleSignInPasswordRef.current.type = "password"
    }
    const handleRegister = (e) => {
        setUserRegister({ ...userRegister, [e.target.name]: e.target.value })
    }

    const addUserToDb = async (e) => {
        e.preventDefault()
        await register(userRegister.signupemail, userRegister.signuppassword)
    }
    const handleUserLogin = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        await login(userLogin.signinemail, userLogin.signinpassword)
    }

    return (
        <div id="memberShipPageContainer" style={{ minHeight: "100vh" }} className='h-100 d-flex align-items-center justify-content-center'>
            <div className="membershipContainer">

                <div id='memberShipHeader' className='w-100 d-flex align-items-center-justify-content-between flex-row'>
                    <div onClick={() => setCurrentProsses(false)} className={`${currentProsses === false ? "w-100 h-100 d-flex align-items-center justify-content-center" : "w-100 h-100 d-flex align-items-center justify-content-center softblue"}`}>
                        <button ref={toggleSignUpRef} className={`${currentProsses === true ? "text-white w-100 h-100 my-4" : "w-100 h-100 my-4 text-softblue"}`}>Register</button>
                    </div>
                    <div onClick={() => setCurrentProsses(true)} className={`${currentProsses === false ? "w-100 h-100 d-flex align-items-center justify-content-center softblue" : "w-100 h-100 d-flex align-items-center justify-content-center"}`}>
                        <button ref={toggleSignInRef} className={`${currentProsses === false ? "text-white w-100 h-100 my-4" : "w-100 h-100 my-4 text-softblue"}`}>Login</button>
                    </div>
                </div>

                {/* Sign Up Form START */}
                <form onSubmit={addUserToDb} className={`${currentProsses === false ? "membershipForm w-100 d-flex align-items-center-justify-content-center flex-column px-5" : "d-none"}`}>
                    <div className='w-100 d-flex align-items-center justify-content-between mt-4'>
                        <i className="fa-solid fa-envelope fs-6"></i>
                        <input onChange={handleRegister} value={userRegister.email} name="signupemail" type="email" className='w-100' placeholder='E-mail' />
                    </div>
                    <div className='w-100 d-flex align-items-center justify-content-between mt-2'>
                        <i className="fa-solid fa-lock fs-6"></i>
                        <input onChange={handleRegister} value={userRegister.password} name="signuppassword" ref={visibleSignUpPasswordRef} className='w-100' type="password" placeholder='Password' />
                        <i onClick={handleVisibleSignUpPassword} className={`${visibleSignUpPassword === true ? "fa-solid fa-eye text-dark" : "fa-solid fa-eye-slash text-dark"}`}></i>
                    </div>
                    <div className='w-100 d-flex align-items-center justify-content-between mt-2'>
                        <i className='fa fa-repeat fs-6'></i>
                        <input onChange={handleRegister} value={userRegister.rePassword} name="signuprePassword" ref={visibleSignUpRePasswordRef} className='w-100' type="password" placeholder='Re-Password' />
                        <i onClick={handleVisibleSignUpRePassword} className={`${visibleSignUpRePassword === true ? "fa-solid fa-eye text-dark" : "fa-solid fa-eye-slash text-dark"}`}></i>
                    </div>
                    <button id='signUpButton' type='submit' className='mt-3 softblue border-0 text-white'>Register</button>

                </form>
                <div className={`${currentProsses === false ? "w-100 px-5 membershipOtherMethod" : "d-none"}`}>
                    <h6 className='text-softblue my-4 fs-5 line'><span className='px-4'>OR</span></h6>
                    <div className='d-flex align-items-center justify-content-center'>
                        <button className='d-flex align-items-center justify-content-center mx-2 softred text-white rounded-circle'>
                            <i className="fa-brands fa-google"></i>
                        </button>
                        <button className='d-flex align-items-center justify-content-center mx-2 softblue text-white rounded-circle'>
                            <i className="fa-brands fa-facebook-f "></i>
                        </button>
                        <button className='d-flex align-items-center justify-content-center mx-2 softlightblue text-white rounded-circle'>
                            <i className="fa-brands fa-twitter "></i>
                        </button>
                    </div>

                    <div className='mt-3'>
                        <NavLink className="text-decoration-none" to="/">Back To Main Page</NavLink>
                    </div>
                </div>
                {/* Sign Up Form END */}


                {/* Sign In Form START */}
                <form onSubmit={handleLoginSubmit} id='' className={`${currentProsses === true ? "membershipForm w-100 d-flex align-items-center-justify-content-center flex-column px-5" : "d-none"}`}>
                    <div className='w-100 d-flex align-items-center justify-content-between mt-4'>
                        <i className="fa-solid fa-envelope fs-6"></i>
                        <input onChange={handleUserLogin} value={userLogin.email} name="signinemail" type="email" className='w-100' placeholder='E-mail' />
                    </div>
                    <div className='w-100 d-flex align-items-center justify-content-between mt-2'>
                        <i className="fa-solid fa-lock fs-6"></i>
                        <input onChange={handleUserLogin} value={userLogin.password} name="signinpassword" ref={visibleSignInPasswordRef} className='w-100' type="password" placeholder='Password' />
                        <i onClick={handleVisibleSignInPassword} className={`${visibleSignInPassword === true ? "fa-solid fa-eye text-dark" : "fa-solid fa-eye-slash text-dark"}`}></i>
                    </div>
                    <button type='submit' className='mt-4 softblue border-0 text-white'>Login</button>
                    <NavLink className="text-decoration-none mt-2" to="/forgot-password">Forgot Password ?</NavLink>
                </form>
                <div  className={`${currentProsses === true ? "w-100 px-5 membershipOtherMethod" : "d-none"}`}>
                    <h6 className='fs-5 line my-3'><span className='px-4'>OR</span></h6>
                    <div className='d-flex align-items-center justify-content-center rounded-circle'>
                        <button className='d-flex align-items-center justify-content-start mx-2  softred text-white rounded-circle'>
                            <i className="fa-brands fa-google"></i>
                        </button>
                        <button className='d-flex align-items-center justify-content-start mx-2 softblue text-white rounded-circle'>
                            <i className="fa-brands fa-facebook-f"></i>
                        </button>
                        <button className='d-flex align-items-center justify-content-start mx-2 softlightblue text-white rounded-circle'>
                            <i className="fa-brands fa-twitter"></i>
                        </button>
                    </div>

                    <div className='mt-3'>
                        <NavLink className="text-decoration-none" to="/">Back To Main Page</NavLink>
                    </div>
                </div>
                {/* Sign In Form END */}
            </div >
        </div >

    )
}

export default memo(Register)