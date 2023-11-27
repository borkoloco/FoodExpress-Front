
import style from "./AddCart.module.css";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { Alert } from "../Alert/Alert";
import { useState } from "react";

export const AddCart = ({ amount, id }) => {
  const numAmount = parseInt(amount)
  if (numAmount < 1) {

    window.alert('La cantidad minima es 1')
  }

  const [cartProducts, setCartProducts] = useLocalStorage('cart', [])
  const [showAlert, setShowAlert] = useState(false);

  const addInput = () => {

    const data = { id: parseInt(id), amount: parseInt(amount) }
    let flag = false;
    let index
    let newAmount

    const newCartProducts = cartProducts.map((el, ind) => {
      if (el.id == id) {
        newAmount = parseInt(el.amount) + parseInt(amount)
        flag = true
        return { ...el, amount: newAmount }
      } else {
        return { ...el }
      }

    })
    if (flag === true) {
      console.log('entra en true');
      setCartProducts(newCartProducts)
    } else {
      if (amount && amount >= 1) {
        console.log('entra en el false');
        setCartProducts([...cartProducts, data])
      }
    }


    /* Esto es para desplegar una pequeña alerta abajo a la derecha
    cuando se agrega algo al carrito */
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  }









  return (
    <div>
      <button className={`card-link ${style.btnAdd}`} onClick={addInput}>Add to Cart</button>
      <Alert show={showAlert} message="¡Producto agregado al carrito!"/>
    </div>
  )
};