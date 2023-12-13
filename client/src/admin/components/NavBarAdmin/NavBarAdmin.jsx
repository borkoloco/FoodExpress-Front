import { useDispatch } from "react-redux";
import icon_burguer from "../../assets/icon-burguer.svg";
import { logoutByUser, startGoogleLogout } from "../../../redux/actions/action";
import { NavLink, useNavigate } from "react-router-dom";
import { validateSesion } from "../../../utils/validateSesion";

export const NavBarAdmin = ({ Toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataLoginUser = JSON.parse(localStorage.getItem("sesion"));
  const authenticated = validateSesion(dataLoginUser); //True: autenticado; false: no autenticado

  const handleLogout = () => {
    dispatch(logoutByUser());
    dispatch(startGoogleLogout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <a className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}>
        <img src={icon_burguer} alt="icon-burguer" />
      </a>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-black"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {authenticated ? dataLoginUser.nameUser : "Perfil"}
            </a>
            <div
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownId"
            >
              <NavLink to="/" className="dropdown-item">
                Home
              </NavLink>
 
              {/* <a className="dropdown-item" href="#">
                Profile
              </a>
              <a className="dropdown-item" href="#">
                Settings
              </a> */}
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                <strong>Logout</strong>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
