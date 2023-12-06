import { useEffect } from "react";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import style from "./Checkout.module.css";
import { getCartByUser, sendCartToMercadoPago } from "../../../redux/actions/action";
import { TableYourOrder } from "../../components/Payments/TableYourOrder";
import { validateSesion } from "../../../utils/validateSesion";
import { FormBillingDetails } from "../../components/Payments/FormBillingDetails";

export const Checkout = () => {
  const dispatch = useDispatch();
  const cartBDTemp = useSelector((state) => state.cartBDTemp);
  const dataLoginUser = JSON.parse(localStorage.getItem("sesion"));
  const authenticated = validateSesion(dataLoginUser); //True: autenticado; false: no autenticado

  const propertiesReadyToSend = cartBDTemp.map((item) => ({
    idMenu: item.menu.idMenu,
    nameMenu: item.menu.nameMenu,
    price: item.menu.price,
    description: item.menu.description,
    quantity: item.cantidad,
    subtotal: item.subtotal,
  })) || null;

  const handleClickPay = async() => {
    try {
      const response = await dispatch(sendCartToMercadoPago(propertiesReadyToSend));
      
        window.location.href = response.payload;
      
    } catch (error) {
      console.log('Error al procesar el pago:', error.message);
    }
  };

  useEffect(() => {
    if(authenticated){
      dispatch(getCartByUser(dataLoginUser.idUser));
    }
    // console.log(dataLoginUser);
  }, []);

  return (
    <>
      <div className={style.containerHeader}>
        <BackButton />
        <hr />
        <h2>Checkout</h2>
      </div>

      {
        authenticated ? (<div className={style.containerCheckout}>
          {/* <div className={style.billingDetails}>
            <FormBillingDetails/>
          </div> */}
          <div className={style.yourOrder}>
            <TableYourOrder handleClick={handleClickPay} properties={propertiesReadyToSend}/>
          </div>
        </div>) : <div style={{padding: "7rem"}}><center>"Debe iniciar sesion si quiere comprar"</center></div>
      }

      
      
    </>
  );
};
