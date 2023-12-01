import { NavLink } from "react-router-dom";
import { FormButton } from "../FormButtton/FormButton";
import style from "./EmptyCart.module.css";

export const EmptyCart = () => {
  return (
    <div className={style.containerAlert}>
        <div className="alert alert-warning px-5" role="alert">
        ⚠ Your cart is empty
        </div>
        <NavLink to="/home"><button className="btn ">Return to the store</button></NavLink>
    </div>
  );
};
