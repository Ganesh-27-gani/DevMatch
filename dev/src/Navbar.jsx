import React, { useEffect, useState } from "react";
import image from "./assets/images/logo3.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUsername(parsed.name);
    } else {
      setUsername(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "rgb(3, 3, 4)" }}>
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          <img src={image} style={{ height: "47px", width: "160px" }} />
        </Link>

        <ul>
          <Link to="/about"><li>about</li></Link>
        </ul>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item dropdown" style={{ fontSize: "20px" }}>
              <a
                className="nav-link dropdown-toggle active text-light"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
              >
                Profile
              </a>

              <ul
                className="dropdown-menu dropdown-menu-end bg-dark"
                aria-labelledby="navbarDropdownMenuLink"
                style={{ background: "rgb(109, 109, 109)" }}
              >

                {/* When NOT logged in */}
                {!username && (
                  <>
                    <li>
                      <Link to="/regester" className="dropdown-item text-light">
                        Register
                      </Link>
                    </li>

                    <li>
                      <Link to="/login" className="dropdown-item text-light">
                        Login
                      </Link>
                    </li>
                  </>
                )}

                 {username && (
                  <>
                    <li className="dropdown-item text-light">
                      👤 {username}
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-light"
                        style={{ background: "transparent", border: "none" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
