import { NavLink } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Navbar(props) {
  return (
    <div className="navcontainer">
      <nav className="navbar navbar-expand-lg">
        <NavLink to="/" className="navbar-brand brand-name text-white text-align-center fs-2 fw-bold">
          {props.name}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                
              </a>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* Dropdown Items */}
                <NavLink to="/" className="dropdown-item">
                  Scientific
                </NavLink>
                <NavLink to="/bmi" className="dropdown-item">
                  BMI
                </NavLink>
                <NavLink to="/currency" className="dropdown-item">
                  Currency
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
