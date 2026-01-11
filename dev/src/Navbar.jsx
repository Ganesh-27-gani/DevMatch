import React from 'react';
import image from "./assets/images/logo3.png"
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{background:" rgb(3, 3, 4)" }}>
            <div className="container-fluid">

                <Link className="navbar-brand" to="/"><img src={image} alt="#" style={{ height: "47px", width: "160px" }} /></Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">

                    <ul className="navbar-nav me-auto  " style={{fontSize:"20px", color:"red"}}>
                        <li className="nav-item"  >
                            <Link to="/" className="nav-link active text-light "  href="#">Home</Link>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link text-light" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#">Pricing</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown " style={{fontSize:"20px"}}>
                            <a
                                className="nav-link dropdown-toggle active text-light"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Profile
                            </a>

                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                                style={{ background: "#cea4ffff" , }}
                            >
                                <li><Link to="/regester" className="dropdown-item" href="#">Reagester</Link></li>
                                <li><Link to="/login" className="dropdown-item" href="#">Login</Link></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
