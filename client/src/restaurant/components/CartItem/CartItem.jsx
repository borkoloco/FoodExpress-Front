import imgTemp from "../../../assets/banner-food.jpg";
import style from "./CartItem.module.css";
import {
  cleanDetailMenu,
  getMenuDetailById,
  removeFromCartDB,
  removeOneFromCart,
} from "../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { addToCart } from "../../../redux/actions/action";
import { removeFromCart } from "../../../redux/actions/action";
import { addToCartDB } from "../../../redux/actions/action";
import { AddCart } from "../../../ui/components/AddCart/AddCart";
import { FaTrash } from "react-icons/fa";
import { validateSesion } from "../../../utils/validateSesion";

export const CartItem = ({
  id,
  amount,
  description,
  nameMenu,
  price,
  specialtyMenu,
  typeMenu,
  imageUrl,
}) => {
  const [cartProducts, setCartProducts] = useLocalStorage("cart", "[]");
  let subTotal = price * amount;
  const dispatch = useDispatch();
  const prueba = { id: parseFloat(id), amount: parseFloat(amount) };
  // const userAuth = useSelector((state) => state.userAuth);
  // const userLogued = useSelector((state) => state.userLogued);

  const dataLoginUser = JSON.parse(localStorage.getItem("sesion"));
  const authenticated = validateSesion(dataLoginUser);

  const removeButton = () => {
    const updatedProducts = cartProducts.filter((cart) => cart.id !== id);
    console.log(updatedProducts);

    dispatch(removeFromCart(prueba));

    if (authenticated) {
      const newAmount = 0;
      dispatch(removeFromCartDB(dataLoginUser.idUser, id, 0));
    }

    // if (Object.keys(dataLoginUser).length > 0) {
    //   const newAmount = 0;
    //   dispatch(removeFromCartDB(dataLoginUser.idUser, id, 0));
    // }
  };

  const addInput = () => {
    const data = { id: parseInt(id), amount: 1 };
    let flag = false;
    let index;
    let newAmount;

    const newCartProducts = cartProducts.map((el, ind) => {
      if (el.id == id) {
        newAmount = parseInt(el.amount) + parseInt(amount);
        flag = true;
        return { ...el, amount: newAmount };
      } else {
        return { ...el };
      }
    });
    if (flag === true) {
      console.log("entra en true");
      setCartProducts(newCartProducts);
    } else {
      if (amount && amount >= 1) {
        console.log("entra en el false");
        setCartProducts([...cartProducts, data]);
      }
    }

    /*Funcionalidad del icono del carrito */
    dispatch(addToCart(data));

    if (authenticated) {
      dispatch(addToCartDB(data, dataLoginUser.idUser));
    }

    // if (Object.keys(dataLoginUser).length > 0) {
    //   dispatch(addToCartDB(data, dataLoginUser.idUser));
    // }
  };

  const removeInput = () => {
    if (authenticated) {
      const newAmount = amount - 1;

      dispatch(removeFromCartDB(dataLoginUser.idUser, id, newAmount));
    }

    // if (Object.keys(dataLoginUser).length > 0) {
    //   const newAmount = amount - 1;
    //   dispatch(removeFromCartDB(dataLoginUser.idUser, id, newAmount));
    // }
    if (amount === 1) {
      removeButton();
    }
    if (amount > 1) {
      dispatch(removeOneFromCart(id));
    }
  };

  return (
    <>
      {/* Desktop */}
      <tr className={style.cardA}>
        <td>
          <div className={style.containerCard}>
            <img className={style.image} src={imageUrl} />
            <div className={style.features}>
              <strong>{nameMenu}</strong>
              <br />

              <br />
            </div>
          </div>
        </td>
        <td>${price}</td>
        <td>${subTotal}</td>
        <td>
          <button className="btn btn-outline-secondary" onClick={removeInput}>
            -
          </button>
          <label className={style.amountView}>{amount}</label>
          <button className="btn btn-outline-secondary" onClick={addInput}>
            +
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={removeButton}>
            <FaTrash />
          </button>
        </td>
      </tr>

      {/* Responsive */}
      <div className={style.card}>
        <div className={style.cardContent}>
          <img className={style.image} src={imageUrl} alt="Product" />
          <div className={style.details}>
            <strong>{nameMenu}</strong>
            <span className="">Price: ${price}</span>
            <span>Subtotal: ${subTotal}</span>
          </div>
          <div className={style.interactions}>
            <button className="btn btn-outline-secondary" onClick={removeInput}>-</button>
            <label className={style.amountView}>{amount}</label>
            <button className="btn btn-outline-secondary" onClick={addInput}>+</button>
          </div>
          <div className={style.removeButton}>
            <button className="btn btn-danger" onClick={removeButton}><FaTrash /></button>
          </div>
        </div>
    </div>
    </>
  );
};
