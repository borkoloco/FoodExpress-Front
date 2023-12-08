import imgTemp from "../../../assets/banner-food.jpg"
import style from './CartItem.module.css'
import {
  cleanDetailMenu,
  getMenuDetailById,
  removeOneFromCart,
} from "../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../utils/useLocalStorage"
import { addToCart } from "../../../redux/actions/action";
import { removeFromCart } from "../../../redux/actions/action";
import { addToCartDB } from "../../../redux/actions/action";
import { AddCart } from "../../../ui/components/AddCart/AddCart";

export const CartItem = ({ id, amount, description, nameMenu, price, specialtyMenu, typeMenu, imageUrl }) => {

  const [cartProducts, setCartProducts] = useLocalStorage('cart', '[]')
  let subTotal = price * amount
  const dispatch = useDispatch()
  const prueba = { id: parseFloat(id), amount: parseFloat(amount) }
  const userAuth = useSelector((state) => state.userAuth)
  const userLogued = useSelector((state) => state.userLogued)


  const removeButton = () => {

    const updatedProducts = cartProducts.filter((cart) => cart.id !== id)
    console.log(updatedProducts);

    dispatch(removeFromCart(prueba))


  }

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


    if (Object.keys(userAuth).length > 0) {

      dispatch(addToCartDB(data, userAuth.data.idUser))
    }

    if (Object.keys(userLogued).length > 0) {
      dispatch(addToCartDB(data, userLogued.idUser))
    }
  };

  const removeInput = () => {
    if (amount === 1) {
      removeButton()
    }
    if (amount > 0) {
      dispatch(removeOneFromCart(id))
    }
  }


  return (
    <>
      <tr>
        <td >
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
          <button class="btn btn-info" onClick={removeInput}>-</button>
          <label className={style.amountView}>
            {amount}

          </label>
          <button class="btn btn-info" onClick={addInput}>+</button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={removeButton}>Remove</button>
        </td>
      </tr>
    </>
  );
};
