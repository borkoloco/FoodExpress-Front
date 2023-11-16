import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo-FE.svg';

export const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <NavLink className="navbar-brand" to="/home">
            <img src={logo} alt='logo-FE'/>
          </NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/menu">
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/form">
                  Form
                </NavLink>
              </li>
             
            </ul>

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>

            <ul className="navbar-nav ms-3">

              <li className="nav-item">
                <a className="nav-link" href="#">
                <strong>$20.00</strong>
                </a>
              </li>
    
              <li className="nav-item">
                <a className="nav-link" href="#">
                Account
                </a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};
