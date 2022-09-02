import React from 'react'
import "../register/register.css"

const Login = () => {
  return (
    <div className='loginPageContainer d-flex align-items-center justify-content-center flex-column'>
      <div className="d-flex align-items-center justify-content-center flex-column">

        <div className="first mb-3">
          <h3 id='registerHeader' className='text-uppercase text-white w-100 h-100'>Login</h3>
          <div className='secondHeader'></div><div className='thirdHeader'></div>
        </div>
        <div className="first mt-4">
          <input type="text" className='w-100 h-100' placeholder='E-mail' />
          <div className='second'></div><div className='third'></div>
        </div>
        <div className="first mt-4">
          <input type="text" className='w-100 h-100' placeholder='Password' />
          <div className='second'></div><div className='third'></div>
        </div>
        <div className="first mt-4">
          <button type="submit" className='w-100 h-100'>Kayıt Ol</button>
          <div className='secondBtn'></div><div className='thirdBtn'></div>
        </div>
      </div>
    </div>
  )
}

export default Login