import React, { useEffect, memo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./navbar.css"
import { useUserContext } from '../../context/UserContext'
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout, setIsLoggedIn, isLoggedIn, visitor } = useUserContext()

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn")) {
            let currentValue = localStorage.getItem("isLoggedIn")
            if (currentValue !== isLoggedIn) {
                setIsLoggedIn(currentValue)
            }
        }
        else if (localStorage.getItem("currentUser")) {

        }
        else {
            localStorage.setItem("isLoggedIn", "false")
            setIsLoggedIn("false")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    const handleCurrentUserLogout = async () => {
        await logout()
        await localStorage.setItem("isLoggedIn", "false")
        await localStorage.setItem("currentUser", JSON.stringify(visitor))
        setIsLoggedIn("false")
        alertify.success("Logout Successful")
        navigate("/", { replace: true });
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container navbarContainer">
                <Link className="navbar-brand" to="/">E-Commer App</Link>
                <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i className="fa-solid fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className='searchBar d-flex align-items-center col-lg-4'>
                        <input className='w-100' type="search" placeholder='Search' />
                    </div>
                    <div className="navbar-nav p-0 m-0 pe-0  justify-content-between ms-auto p-0">
                        <NavLink className={`${isLoggedIn === "true" ? "loggedin" : "navlink my-auto"}`} to="/register"><i className="me-2 fa-solid fa-registered"></i>Register</NavLink>
                        <NavLink className={`${isLoggedIn === "true" ? "loggedin" : "navlink my-auto"}`} to="/login"><i className="me-2 fa-solid fa-right-to-bracket"></i>Login</NavLink>
                        <div className={`${isLoggedIn === "false" ? "loggedin" : "navlink my-auto dropdown me-0"}`}>
                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="me-1 fa-solid fa-user"></i>
                            </button>
                            <ul className="dropdown-menu bg-dark border-0">
                                <li><NavLink className="dropdown-item text-white" to="/profile">Profile</NavLink></li>
                                <li><NavLink className="dropdown-item text-white" to="/profile/myproducts">My Products</NavLink></li>
                                <li><NavLink className="dropdown-item text-white" to="/profile/orders">Orders</NavLink></li>
                                <li><NavLink className="dropdown-item text-white" to="/profile/addproduct">Add Product</NavLink></li>
                                <li><NavLink className="dropdown-item text-white" to="/profile/settings">Settings</NavLink></li>
                                <li><button onClick={handleCurrentUserLogout} className={`${isLoggedIn === "false" ? "loggedin" : "dropdown-item text-white"}`} href="#">Log Out</button></li>
                            </ul>
                        </div>
                        <button className='navlink my-auto'><i className="my-auto me-2 fa-solid fa-bell"></i>Notification</button>
                        <NavLink className="navlink my-auto" to="/basket"><span id='basketCount' className="badge bg-white text-dark me-2">0</span>Basket</NavLink>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default memo(Navbar)


// className={`${isLoggedIn === false ? "navlink my-auto" : "d-none"}`}