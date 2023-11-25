import React from "react";
import { useDispatch } from "react-redux";
import { startGoogleAuth } from "../../redux/actions/action";

function Login() {
  const dispatch = useDispatch();

  const handleGoogleAuth = () => {
    dispatch(startGoogleAuth());
  };

  return (
    <div>
      Login
      <button onClick={handleGoogleAuth}>Login con Google</button>
    </div>
  );
}

export default Login;
