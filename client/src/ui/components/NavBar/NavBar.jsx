import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo-FE.svg";
import { AccountButton } from "../../../auth/components/AccountButton/AccountButton";
import { CartButton } from "../CartButton/CartButton";
import { useSelector } from "react-redux";
import { validateSesion } from "../../../utils/validateSesion";
import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./Navbar.module.css"

export const NavBar = () => {
  const dataLoginUser = JSON.parse(localStorage.getItem("sesion"));
  const authenticated = validateSesion(dataLoginUser); //True: autenticado; false: no autenticado


  /* CONTENIDO CENTRAL DEL NAVBAR */
  const content =  (
    <>
      <NavLink className={`nav-link ${styles.item}`} to="/">
        Home
      </NavLink>
      <NavLink className={`nav-link ${styles.item}`} to="/menus">
        Menus
      </NavLink>
      {authenticated && (
        <NavLink to="/comments" className="nav-link">
          <button className={`${styles.bookmarkBtn} ${styles.item}`}>
            <span className={styles.IconContainer}>
              <svg fill="white" viewBox="0 0 512 512" height="1em">
                <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path>
              </svg>
            </span>
            <p className={styles.text}>Comments</p>
          </button>
        </NavLink>
      )}
    </>
  );

  return (
    <nav className={styles.nav}>

      <div className={styles.containerNav}>

        <div className={styles.navbarLeft}>
          <button className={`${styles.iconBurguer} ${styles.hide}`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <RxHamburgerMenu color="#00000"/>
          </button>
          <NavLink className="navbar-brand" to="/">
            <img className={styles.img} src={logo} alt="logo-FE" />
          </NavLink>
        </div>

        <div className={styles.containerItems}>
          {content}
        </div>

        <div className={styles.navbarRight}>
        
          <NavLink to="/cart" className="nav-link" href="#">
            <CartButton />
          </NavLink>
    
          <div className={styles.login}>
            <AccountButton />
          </div>
             
        </div>


        <div
          className="offcanvas offcanvas-end"
          style={{ width: '55%' }}
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              NAVIGATION
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          {/* BOdy offcanva */}
          <div className="offcanvas-body">
            <center>
              {content}
            </center>
          </div>
        </div>


      </div>
      
    </nav>
  );
};



{/* <div className="shadow-sm  z-1 position-relative  rounded">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="logo-FE" />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/menus">
                  Menus
                </NavLink>
              </li>
   
            </ul>

            {authenticated && (
              <NavLink to="/comments" className="nav-link">
                <button className="bookmarkBtn">
                  <span className="IconContainer">
                    <svg fill="white" viewBox="0 0 512 512" height="1em">
                      <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path>
                    </svg>
                  </span>
                  <p className="text">Comments</p>
                </button>
              </NavLink>
            )}
            

            <ul className="navbar-nav ms-3">
              <li className="nav-item mx-2">
                <NavLink to="/cart" className="nav-link" href="#">
                  <CartButton />
                </NavLink>
              </li>

              <li className="nav-item">
                <div className="nav-link">
                  <AccountButton />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div> */}
