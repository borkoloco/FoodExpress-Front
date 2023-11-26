
import { NavLink } from 'react-router-dom';
import { FormButton } from '../../../ui/components/FormButtton/FormButton';
import { useForm } from '../../../restaurant/hooks/useForm';
import { useDispatch } from "react-redux";
import { startGoogleAuth, startGoogleLogout } from "../../../redux/actions/action";
import style from './Register.module.css'

const Register = () => {

  const dispatch = useDispatch();
  const { formState, onInputChange, errors } = useForm({
      username:"",
      email: "",
      password:"",
  })

  const handleGoogleAuth = () => {
    dispatch(startGoogleAuth());
  };

  const handleLogout = () => {
    dispatch(startGoogleLogout());
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
            placeholder="Username"
            className={`form-control ${errors.username ? 'is-invalid' : formState.username ? 'is-valid' : ''}`}
            name="username"
            value={formState.username}
            onChange={onInputChange}
          />
          {errors.username &&
          (<p className={`text-danger ${style.errorsSize}`}>{errors.username}</p>)}
        </div>
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

        <FormButton nameButton="Sing up" />
        <NavLink to="/login">
            <FormButton nameButton="Login" outline={true} />
        </NavLink>
        <FormButton eventHandler={handleGoogleAuth} nameButton="Continue with Google" outline={true} />
        <FormButton eventHandler={handleLogout} nameButton="Logout Google" outline={true} />
      </div>
    </div>
  )
}

export default Register;
