import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-light ">
                <div className="container-fluid">
                    <Link className='navbar-brand logo-font' to='/'>Instagram</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav nav ">
                            {Cookies.get('jwtooken') ?
                                (<>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile"><span className="font-weight-bolder">Profile</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create"><span className="font-weight-bolder">Create Post</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout"><span className="font-weight-bolder">Log Out</span></Link>
                                    </li>
                                </>) :
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login"><span className="font-weight-bolder">Login</span></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signup"><span className="font-weight-bolder">Signup</span></Link>
                                        </li>
                                    </>
                                )
                            }



                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar