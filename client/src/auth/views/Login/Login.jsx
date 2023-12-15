import { NavLink, useNavigate } from "react-router-dom";
import { FormButton } from "../../../ui/components/FormButtton/FormButton";
import { useForm } from "../../../restaurant/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleAuth,
  startGoogleLogout,
  loginByUser,
  startLoginWithEmail,
  addToCart,
  addToCartDB,
} from "../../../redux/actions/action";
import { useEffect, useState } from "react";
import { areThereErrors } from "../../../utils/areThereErrors";
import style from "./Login.module.css";
import eyeOpen from "../../../assets/icons/eye-open.svg";
import eyeclose from "../../../assets/icons/eye-close.svg";

export const Login = () => {
  const dispatch = useDispatch();
  // const userLogued = useSelector((state) => state.userLogued);
  const navigate = useNavigate();
  const { formState, onInputChange, errors } = useForm({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const cartItemsDB = useSelector((state) => state.cartItemsDB);
  const cartItems = useSelector((state) => state.cartItems);
  const userAuth = useSelector((state) => state.userAuth);
  const userLogued = useSelector((state) => state.userLogued);

  useEffect(() => {
    cartItemsDB &&
      cartItemsDB.length > 0 &&
      cartItemsDB.map((el) => {
        dispatch(addToCart(el));
      });

    if (Object.keys(userAuth).length > 0) {
      cartItems &&
        cartItems.length > 0 &&
        cartItems.map((el) => {
          dispatch(addToCartDB(el, userAuth.data.idUser));
        });
    }

    if (Object.keys(userLogued).length > 0) {
      cartItems &&
        cartItems.length > 0 &&
        cartItems.map((el) => {
          dispatch(addToCartDB(el, userLogued.idUser));
        });
    }
  }, [cartItemsDB]);

  //Login forma 1
  const handleLoginByUser = () => {
    dispatch(loginByUser(formState));
  };

  //Login forma 2
  // const handleLoginByUser = () => {
  //   const { email, password } = formState;
  //   dispatch(startLoginWithEmail(email, password));
  // };

  //Login con Google
  const handleGoogleAuth = () => {
    dispatch(startGoogleAuth());
  };

  // const handleLogout = () => {
  //   dispatch(startGoogleLogout());
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && areThereErrors(errors)) {
      dispatch(loginByUser(formState));
    }
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

        <div className="input-group">
          <input
            type={`${showPassword ? "text" : "password"}`}
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
            onKeyDown={handleKeyDown}
            aria-label="Amount (to the nearest dollar)"
          />
          <span className="input-group-text">
            <button
              style={{ border: "none", background: "transparent" }}
              checked={showPassword}
              onClick={toggleShowPassword}
            >
              <img src={showPassword ? eyeclose : eyeOpen} alt="icon" />
            </button>
          </span>
        </div>
        {errors.password && (
          <div className={style.containerError}>
            <p className={`text-danger ${style.errorsSize}`}>
              {errors.password}
            </p>
          </div>
        )}

        <p className="form-text mt-3">
          {/* <a className={`${style.links}`} href="#">
            Forget Password
          </a> */}
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
