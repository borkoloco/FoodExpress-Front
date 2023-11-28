import { useEffect, useState } from "react";
import cart from "../../../assets/icons/cart.svg";
import style from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../redux/actions/action";

export const CartButton = () => {

  const dispatch = useDispatch();
  const cartAmount = useSelector((state) => state.cart);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      dispatch(updateCart(updatedCart));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  const totalAmount = cartAmount.reduce((total, item) => total + item.amount, 0);


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
