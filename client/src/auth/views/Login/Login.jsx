import { NavLink } from "react-router-dom";
import { FormButton } from "../../../ui/components/FormButtton/FormButton";
import { useForm } from "../../../restaurant/hooks/useForm";
import { useDispatch } from "react-redux";
import { startGoogleAuth, startGoogleLogout, loginByUser } from "../../../redux/actions/action";
import { areThereErrors } from "../../../utils/areThereErrors";
import style from "./Login.module.css";


export const Login = () => {

  const dispatch = useDispatch();
  
  const { formState, onInputChange, errors } = useForm({
      email: "",
      password:"",
  })

  const handleLoginByUser = () => {
    dispatch(loginByUser(formState));
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
            className={`form-control ${errors.email ? 'is-invalid' : formState.email ? 'is-valid' : ''}`}
            name="email"
            value={formState.email}
            onChange={onInputChange}
          />
          {errors.email &&
          (<p className={`text-danger ${style.errorsSize}`}>{errors.email}</p>)}


        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className={`form-control ${errors.password ? 'is-invalid' : formState.password ? 'is-valid' : ''}`}
            name="password"
            value={formState.password}
            onChange={onInputChange}
          />
          {errors.password &&
          (<p className={`text-danger ${style.errorsSize}`}>{errors.password}</p>)}
        </div>

        <p className="form-text">
          <a className={`${style.links}`} href="#">
            Forget Password
          </a>
        </p>

        <FormButton eventHandler={handleLoginByUser} nameButton="Login" disabled={ !areThereErrors(errors) } />
        <NavLink to="/register">
            <FormButton nameButton="Sign up" outline={true} />
        </NavLink>
        <FormButton eventHandler={handleGoogleAuth} nameButton="Continue with Google" outline={true} />
        {/* <FormButton eventHandler={handleLogout} nameButton="Logout Google" outline={true} /> */}
      </div>
    </div>
  );
};

export default Login;
