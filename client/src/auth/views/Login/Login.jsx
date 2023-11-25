import { NavLink } from "react-router-dom";
import { FormButton } from "../../../ui/components/FormButtton/FormButton";
import { useForm } from "../../../restaurant/hooks/useForm";
import style from "./Login.module.css";


export const Login = () => {

    const { formState, onInputChange, errors } = useForm({
        email: "",
        password:"",
    })

  return (
    <div
      className={`d-flex justify-content-center mt-5 ${style.containerLogin}`}
    >
      <div className={`${style.containerForm}`}>
        <h2 className="mb-4">Login</h2>
        <div class="mb-3">
          <input
            type="email"
            placeholder="Email"
            class={`form-control ${errors.email ? 'is-invalid' : formState.email ? 'is-valid' : ''}`}
            name="email"
            value={formState.email}
            onChange={onInputChange}
          />
          {errors.email &&
          (<p class={`text-danger ${style.errorsSize}`}>{errors.email}</p>)}


        </div>
        <div class="mb-3">
          <input
            type="password"
            placeholder="Password"
            class={`form-control ${errors.password ? 'is-invalid' : formState.password ? 'is-valid' : ''}`}
            name="password"
            value={formState.password}
            onChange={onInputChange}
          />
          {errors.password &&
          (<p class={`text-danger ${style.errorsSize}`}>{errors.password}</p>)}
        </div>

        <p class="form-text">
          <a className={`${style.links}`} href="#">
            Forget Password
          </a>
        </p>

        <FormButton nameButton="Login" />
        <NavLink to="/register">
            <FormButton nameButton="Sign up" outline={true} />
        </NavLink>
        <FormButton nameButton="Continue with Google" outline={true} />
      </div>
    </div>
  );
};

export default Login;
