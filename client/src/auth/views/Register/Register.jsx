import { NavLink, useNavigate } from "react-router-dom";
import { FormButton } from "../../../ui/components/FormButtton/FormButton";
import { useForm } from "../../../restaurant/hooks/useForm";
import { useDispatch } from "react-redux";
import {
  registerByUser,
  startGoogleAuth,
  startGoogleLogout,
  startWithEmail,
} from "../../../redux/actions/action";
import style from "./Register.module.css";
import { areThereErrors } from "../../../utils/areThereErrors";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formState, onInputChange, errors } = useForm({
    nameUser: "",
    email: "",
    password: "",
    idRole: 1, // Envío manual del rol del cliente
  });

  //Login forma 1
  const handleRegisterByUser = () => {
    dispatch(registerByUser(formState));
    navigate('/login')
  }

  //Login forma 2
  // const handleEmailAuth = () => {
  //   const { username, email, password } = formState;
  //   dispatch(startWithEmail(email, password, username));
  //   navigate("/login");
  // };

  // Login con Google
  const handleGoogleAuth = () => {
    dispatch(startGoogleAuth());
  };

  return (
    <div
      className={`d-flex justify-content-center mt-5 ${style.containerRegister}`}
    >
      <div className={`${style.containerForm}`}>
        <h2 className="mb-4">Sing up</h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Nombre"
            className={`form-control ${
              errors.nameUser
                ? "is-invalid"
                : formState.nameUser
                ? "is-valid"
                : ""
            }`}
            name="nameUser"
            value={formState.nameUser}
            onChange={onInputChange}
          />
          {errors.nameUser && (
            <p className={`text-danger ${style.errorsSize}`}>
              {errors.nameUser}
            </p>
          )}
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className={`form-control ${
              errors.email ? "is-invalid" : formState.email ? "is-valid" : ""
            }`}
            name="email"
            value={formState.email}
            onChange={onInputChange}
          />
          {errors.email && (
            <p className={`text-danger ${style.errorsSize}`}>{errors.email}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className={`form-control ${
              errors.password
                ? "is-invalid"
                : formState.password
                ? "is-valid"
                : ""
            }`}
            name="password"
            value={formState.password}
            onChange={onInputChange}
          />
          {errors.password && (
            <p className={`text-danger ${style.errorsSize}`}>
              {errors.password}
            </p>
          )}
        </div>

        <FormButton
          eventHandler={handleRegisterByUser}
          nameButton="Sing up"
          disabled={!areThereErrors(errors)}
        />
        <NavLink to="/login">
          <FormButton nameButton="Login" outline={true} />
        </NavLink>
        <FormButton
          eventHandler={handleGoogleAuth}
          nameButton="Continue con Google"
          outline={true}
        />
        {/* <FormButton
          eventHandler={handleLogout}
          nameButton="Logout"
          outline={true}
        /> */}
      </div>
    </div>
  );
};

export default Register;
