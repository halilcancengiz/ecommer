import React, { useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import "../register/register.css"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { login, setIsLoggedIn } = useUserContext()
  let navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  })

  const handleUserLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const user = await login(userLogin.email, userLogin.password)
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn("true")
    navigate("/", { replace: true });
  }

  return (
    <div className='loginPageContainer d-flex align-items-center justify-content-center flex-column '>
      <form onSubmit={handleLoginSubmit} className="d-flex align-items-center justify-content-center flex-column me-3">

        <div className="first mb-3">
          <h3 id='registerHeader' className='text-uppercase text-white w-100 h-100'>Login</h3>
          <div className='secondHeader'></div><div className='thirdHeader'></div>
        </div>
        <div className="first mt-4">
          <input onChange={handleUserLogin} value={userLogin.email} name="email" type="text" className='w-100 h-100' placeholder='E-mail' />
          <div className='second'></div><div className='third'></div>
        </div>
        <div className="first mt-4">
          <input onChange={handleUserLogin} value={userLogin.password} name="password" type="password" className='w-100 h-100' placeholder='Password' />
          <div className='second'></div><div className='third'></div>
        </div>
        <div className="first mt-4">
          <button type="submit" className='w-100 h-100'>Giriş Yap</button>
          <div className='secondBtn'></div><div className='thirdBtn'></div>
        </div>

      </form>
    </div>
  )
}

export default Login