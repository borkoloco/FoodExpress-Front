import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutByUser } from "../../../redux/actions/action";
import style from "./AccountButton.module.css";
import iconAccount from "../../../assets/icons/user-account.svg";

export const AccountButton = () => {
  const userAuth = useSelector((state) => state.userAuth);
  // const [aux, setAux] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticated = !!userAuth.data; //True: autenticado; false: no autenticado

  /* Inicialmente sin autenticarse te redirige a "/login" */
  const handleLogin = () => {
    if (!authenticated) {
      navigate("/login");
    }
  };

  /* Cierra sesión y redirige a "/login"  */
  const handleLogout = () => {
    if (authenticated) {
      dispatch(logoutByUser());
      navigate("/login");
    }
  }

  /* Luego de autenticarse te redirige a "/home" */
  useEffect(() => {
    if (authenticated) {
      // setAux(!aux);
      navigate("/home");
    }
  }, [userAuth]);

  console.log(authenticated);
  

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
            {userAuth.data.nameUser}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" type="button">
                My Orders
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Edit Profile
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="dropdown-item" type="button">
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
