import style from "./AddCart.module.css";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddCart = ({ amount, id }) => {
  const dispatch = useDispatch();

  /* Funcionalidad de la página del carrito */
  const numAmount = parseInt(amount);
  if (numAmount < 1) {
    window.alert("La cantidad minima es 1");
  }

  const [cartProducts, setCartProducts] = useLocalStorage("cart", []);
  const [showAlert, setShowAlert] = useState(false);

  const addInput = () => {
    const data = { id: parseInt(id), amount: parseInt(amount) };
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

    /* Esto es para desplegar una pequeña alerta abajo a la derecha
    cuando se agrega algo al carrito */
    toast.success('Added to cart successfully', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      });
  };

  return (
    <div>
      <button className={`${style.btnAdd}`} onClick={addInput}>
        Add to Cart
      </button>
      
    </div>
  );
};
