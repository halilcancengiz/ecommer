import React from 'react'
import { NavLink } from 'react-router-dom'
import "./navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container p-0">
                <NavLink className="navbar-brand" to="/">E-Commer App</NavLink>
                <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i className="fa-solid fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className='searchBar d-flex align-items-center col-lg-4'>
                        <input className='w-100' type="search" placeholder='Search' />
                    </div>
                    <div className="navbar-nav p-0 m-0 pe-0  justify-content-between ms-auto p-0">
                        <NavLink className="navlink my-auto" to="register"><i className="me-2 fa-solid fa-registered"></i>Register</NavLink>
                        <NavLink className="navlink my-auto" to="login"><i className="me-2 fa-solid fa-right-to-bracket"></i>Sign In</NavLink>
                        <NavLink className="navlink my-auto" to="profile"><i className="me-2 fa-solid fa-user"></i>Profile</NavLink>
                        <button><i className="my-auto me-2 fa-solid fa-bell"></i>Notification</button>
                        <NavLink className="navlink my-auto" to="basket"><span id='basketCount' className="badge bg-white text-dark me-2">0</span>Basket</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar


{/* <div className='searchBar col-lg-4 d-flex align-items-center justify-content-center'>
                    <input className='w-75' type="search" placeholder='Search' />
                </div>
                <div id='navbarSupportedContent' className='navMenu col-lg-6'>
                    <ul className='list-unstyled d-flex align-items-center justify-content-end h-100'>
                        <li className='m-3'>
                            <NavLink className="navlink" to=""><i className="me-2 fa-solid fa-registered"></i>Register</NavLink>
                        </li>
                        <li className='m-3'>
                            <NavLink className="navlink" to=""><i className="me-2 fa-solid fa-right-to-bracket"></i>Sign In</NavLink>
                        </li>
                        <li className='m-3'>
                            <NavLink className="navlink" to="profile"><i className="me-2 fa-solid fa-user"></i>Profile</NavLink>
                        </li>
                        <li className='m-3'>
                            <button to="profile"><i className=" me-2 fa-solid fa-bell"></i>Notification</button>
                        </li>
                        <li className='m-3'>
                            <NavLink className="navlink" to=""><span id='basketCount' className="badge me-2">0</span>Basket</NavLink>
                        </li>
                    </ul>
                </div> */}