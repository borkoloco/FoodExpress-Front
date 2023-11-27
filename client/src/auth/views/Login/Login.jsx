import { NavLink, useNavigate } from "react-router-dom";
import { FormButton } from "../../../ui/components/FormButtton/FormButton";
import { useForm } from "../../../restaurant/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleAuth,
  startGoogleLogout,
  loginByUser,
  startLoginWithEmail,
} from "../../../redux/actions/action";
import { useEffect } from "react";
import { areThereErrors } from "../../../utils/areThereErrors";
import style from "./Login.module.css";

export const Login = () => {
  const dispatch = useDispatch();
  const userLogued = useSelector((state) => state.userLogued);
  const navigate = useNavigate();
  const { formState, onInputChange, errors } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userLogued.idRole === 1) {
      //es un usuario
      navigate("/");
    } else if (userLogued.idRole === 2) {
      //es un admin
      navigate("/dashboard");
    }
  }, [userLogued]);

  const handleLoginByUser = () => {
    const { email, password } = formState;
    dispatch(startLoginWithEmail(email, password));
  };

  const handleGoogleAuth = () => {
    dispatch(startGoogleAuth());
  };

  const handleLogout = () => {
    dispatch(startGoogleLogout());
  };

  return (
    <div
      className={`d-flex justify-content-center mt-5 ${style.containerLogin}`}
    >
      <div className={`${style.containerForm}`}>
        <h2 className="mb-4">Login</h2>
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

        <p className="form-text">
          <a className={`${style.links}`} href="#">
            Forget Password
          </a>
        </p>

        <FormButton
          eventHandler={handleLoginByUser}
          nameButton="Login"
          disabled={!areThereErrors(errors)}
        />
        <NavLink to="/register">
          <FormButton nameButton="Sign up" outline={true} />
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

export default Login;
