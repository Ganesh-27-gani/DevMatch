import React from 'react';
import image from "./assets/images/logo1.png"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#87acbbff" }}>
            <div className="container-fluid">

                <a className="navbar-brand" href="#"><img src={image} alt="#" style={{ height: "47px", width: "160px" }} /></a>

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

                    <ul className="navbar-nav me-auto  " style={{fontSize:"20px"}}>
                        <li className="nav-item"  >
                            <a className="nav-link active "  href="#">Home</a>
                        </li>
                        <li className="nav-item" >
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown " style={{fontSize:"20px"}}>
                            <a
                                className="nav-link dropdown-toggle active"
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
                                style={{ background: "#a9c2d6ff" }}
                            >
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Login</a></li>
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
