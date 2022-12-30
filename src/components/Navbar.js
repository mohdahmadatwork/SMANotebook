import React from 'react'
import {
    Link,
    useLocation
} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();

    const handlelogout=()=>{
        localStorage.removeItem('auth-token');
        navigate("/login")
    }
    console.log(localStorage.getItem('auth-token'))
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">SMANotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {localStorage.getItem('auth-token')?<div className="d-flex me-2">
                                <button type="button" className={`btn btn-outline-success me-1`} onClick={handlelogout}>Logout</button>
                            </div>:<div className="d-flex me-2">
                                <Link to="/login"><button type="button" className={`btn btn${!(location.pathname === "/login") ? "-outline" : ""}-primary me-1`}>Login</button></Link>
                                <Link to="/signup"><button type="button" className={`btn btn${!(location.pathname === "/signup") ? "-outline" : ""}-success me-1`}>SignUp</button></Link>
                            </div>
                        }
                        <form className=" d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
