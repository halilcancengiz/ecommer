import React from 'react'
import Navbar from '../navbar/Navbar'
import "./register.css"

const Register = () => {
    return (
        <div className='registerPageContainer d-flex align-items-center justify-content-center flex-column'>
            <div className="d-flex align-items-center justify-content-center flex-column me-3">

                <div className="first mb-3">
                    <h3 id='registerHeader' className='text-uppercase text-white w-100 h-100'>Sign Up</h3>
                    <div className='secondHeader'></div><div className='thirdHeader'></div>
                </div>
                <div className="first mt-3">
                    <input type="text" className='w-100 h-100' placeholder='Full Name' />
                    <div className='second'></div><div className='third'></div>
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
                    <input type="text" className='w-100 h-100' placeholder='Re-enter your password' />
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

export default Register