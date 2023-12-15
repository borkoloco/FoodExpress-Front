import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutByUser, startGoogleLogout } from "../../../redux/actions/action";
import style from "./AccountButton.module.css";
import iconAccount from "../../../assets/icons/user-account.svg";
import { validateSesion } from "../../../utils/validateSesion";

export const AccountButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth); //Estado del logeo manual
  const userLogued = useSelector((state) => state.userLogued); //Estado del logeo con google

  /** Te trae los datos de inicio de sesión */
  const dataLoginUser = JSON.parse(localStorage.getItem("sesion"));
  const authenticated = validateSesion(dataLoginUser); //True: autenticado; false: no autenticado
  // console.log("En local storage:",dataLoginUser);

  /* Inicialmente sin autenticarse te redirige a "/login" */
  const handleLogin = () => {
    if (!authenticated) {
      navigate("/login");
    }
  };

  /* Cierra sesión y redirige a "/login"  */
  const handleLogout = () => {
    dispatch(logoutByUser()); //limpia el estado global userLogued y userAuth
    dispatch(startGoogleLogout()); //limpia el uid, displaName y displayEmail por si acaso
    navigate("/login");
  };

  /* Luego de autenticarse manual o con google te redirige a "/home" */
  useEffect(() => {
    if (validateSesion(userAuth)) {
      navigate("/home");
    }
  }, [userAuth]);
  useEffect(() => {
    if (validateSesion(userLogued)) {
      navigate("/home");
    }
  }, [userLogued]);

  return (
    <>
      {authenticated ? (
        // Dropdown cuando el usuario está autenticado
        <div className="btn-group">
          <button
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className={`dropdown-toggle ${style.btnAccount}`}
          >
            <img
              src={iconAccount}
              alt="user-account"
              className={`${style.imgAccount}`}
            />
            {authenticated && dataLoginUser.nameUser}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {dataLoginUser.idRole === 2 && (
              <li>
                <NavLink className={style.textDecoration} to="/dashboard">
                  <button className="dropdown-item" type="button">
                    DashBoard
                  </button>
                </NavLink>
              </li>
            )}

            {dataLoginUser.idRole === 1 && (
              <>
                <li>
                  <NavLink className={style.textDecoration} to="/my-orders">
                    <button className="dropdown-item" type="button">
                      My Orders
                    </button>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={style.textDecoration} to="/address">
                    <button className="dropdown-item" type="button">
                      Address
                    </button>
                  </NavLink>
                </li>
              </>
            )}

            <li>
              {userAuth && Object.keys(userAuth).length > 0 && (
                <NavLink className={style.textDecoration} to="/editprofile">
                  <button className="dropdown-item" type="button">
                    Change Password
                  </button>
                </NavLink>
              )}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="dropdown-item"
                type="button"
              >
                <strong>Logout</strong>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        // Botón de login cuando el usuario no está autenticado
        <button
          type="button"
          className={`${style.btnAccount}`}
          onClick={handleLogin}
        >
          <img
            src={iconAccount}
            alt="user-account"
            className={`${style.imgAccount}`}
          />
          Login
        </button>
      )}
    </>
  );
};
