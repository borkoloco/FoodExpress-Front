import cart from "../../../assets/icons/cart.svg";
import style from "./CartButton.module.css";

export const CartButton = () => {
  return (
    <button className={`${style.btnCart}`}>
      <img src={cart} alt="cart" className={`${style.imgCart}`} />
      $20.00
    </button>
  );
};
