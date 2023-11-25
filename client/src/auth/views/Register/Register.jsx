
import { NavLink } from 'react-router-dom';
import { FormButton } from '../../../ui/components/FormButtton/FormButton';
import { useForm } from '../../../restaurant/hooks/useForm';
import style from './Register.module.css'

const Register = () => {

    const { formState, onInputChange, errors } = useForm({
        username:"",
        email: "",
        password:"",
    })
  return (
    <div
      className={`d-flex justify-content-center mt-5 ${style.containerRegister}`}
    >
      <div className={`${style.containerForm}`}>
        <h2 className="mb-4">Sing up</h2>
        <div class="mb-3">
          <input
            type="text"
            placeholder="Username"
            class={`form-control ${errors.username ? 'is-invalid' : formState.username ? 'is-valid' : ''}`}
            name="username"
            value={formState.username}
            onChange={onInputChange}
          />
          {errors.username &&
          (<p class={`text-danger ${style.errorsSize}`}>{errors.username}</p>)}
        </div>
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

        <FormButton nameButton="Sing up" />
        <NavLink to="/login">
            <FormButton nameButton="Login" outline={true} />
        </NavLink>
        <FormButton nameButton="Continue with Google" outline={true} />
      </div>
    </div>
  )
}

export default Register;
