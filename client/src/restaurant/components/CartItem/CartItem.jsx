import imgTemp from "../../../assets/banner-food.jpg"
import style from './CartItem.module.css'
import {
  cleanDetailMenu,
  getMenuDetailById,
} from "../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../utils/useLocalStorage"
import { addToCart } from "../../../redux/actions/action";
import { removeFromCart } from "../../../redux/actions/action";

export const CartItem = ({ id, amount, description, nameMenu, price, specialtyMenu, typeMenu, imageUrl }) => {

  const [cartProducts, setCartProducts] = useLocalStorage('cart', '[]')
  let subTotal = price * amount
  const dispatch = useDispatch()
  const prueba = { id: parseFloat(id), amount: parseFloat(amount) }

  const removeButton = () => {

    const updatedProducts = cartProducts.filter((cart) => cart.id !== id)
    console.log(updatedProducts);

    dispatch(removeFromCart(prueba))


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
        <td>{amount}</td>
        <td>${subTotal}</td>
        <td>
          <button className="btn btn-danger" onClick={removeButton}>Remove</button>
        </td>
      </tr>
    </>
  );
};
