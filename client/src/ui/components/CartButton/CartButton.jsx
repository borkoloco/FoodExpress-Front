import { useEffect, useState } from "react";
import cart from "../../../assets/icons/cart.svg";
import style from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";


export const CartButton = () => {

  const cartItems = useSelector(state => state.cartItems);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.amount, 0);
  return (
    <>
      <button type="button" className={`${style.btnCart} position-relative`}>
        <img src={cart} alt="cart" className={`${style.imgCart}`} />
        <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${style.bgColor} `}>
          {totalAmount}
        </span>
      </button>
    </>
  );
};
