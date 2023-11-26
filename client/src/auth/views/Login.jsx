import React from "react";
import { useDispatch } from "react-redux";
import { startGoogleAuth, startGoogleLogout } from "../../redux/actions/action";

function Login() {
  const dispatch = useDispatch();

  const handleGoogleAuth = () => {
    dispatch(startGoogleAuth());
  };

  const handleLogout = () => {
    dispatch(startGoogleLogout());
  };

  return (
    <div>
      Login
      <button onClick={handleGoogleAuth}>Login con Google</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Login;
