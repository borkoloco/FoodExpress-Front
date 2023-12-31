import { useEffect, useState } from "react";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import style from "./Checkout.module.css";
import { getCartByUser, sendCartToMercadoPago } from "../../../redux/actions/action";
import { TableYourOrder } from "../../components/Payments/TableYourOrder";
import { validateSesion } from "../../../utils/validateSesion";
import { FormBillingDetails } from "../../components/Payments/FormBillingDetails";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

export const Checkout = () => {
  const dispatch = useDispatch();
  const cartBDTemp = useSelector((state) => state.cartBDTemp);
  const dataLoginUser = JSON.parse(localStorage.getItem("sesion"));
  const authenticated = validateSesion(dataLoginUser); //True: autenticado; false: no autenticado
  const [propertiesReadyToSend, setPropertiesReadyToSend] = useState([]);



  const { formState, onInputChange, errors } = useForm({address:"",note:""});

  const handleClickPay = async() => {
    try {
      if(formState.address !== "Select Address" && formState.address !== ""){
        const response = await dispatch(sendCartToMercadoPago(
          {
            idUser:dataLoginUser.idUser,
            name:dataLoginUser.nameUser,
            email:dataLoginUser.email,
            address:formState.address,
            note:formState.address,
            propertiesReadyToSend
          }
          ));
        window.location.href = response.payload;
      
        console.log("Enviando a mercado pago");
        
      }else {
        Swal.fire({
          icon: "warning",
          title: "Address required",
          text: "Please! Select your address",
        });
      }
      
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

  useEffect(() => {
    localStorage.removeItem("propertiesReadyToSend");
    const storedProperties = JSON.parse(localStorage.getItem("propertiesReadyToSend"));
    if (storedProperties && storedProperties.length > 0) {
      setPropertiesReadyToSend(storedProperties);
    } else if (cartBDTemp && cartBDTemp.length > 0) {
      const propertiesFromCart = cartBDTemp.map((item) => ({
        idMenu: item.menu.idMenu,
        nameMenu: item.menu.nameMenu,
        price: item.menu.price,
        description: item.menu.description,
        quantity: item.cantidad,
        subtotal: item.subtotal,
      }));
  
      setPropertiesReadyToSend(propertiesFromCart);
      localStorage.setItem("propertiesReadyToSend", JSON.stringify(propertiesFromCart));
    }
  }, [cartBDTemp]);

  return (
    <>
      <div className={style.containerHeader}>
        <BackButton />
        <hr />
        <h2>Checkout</h2>
      </div>

      {
        authenticated ? (<div className={style.containerCheckout}>
          <div className={style.billingDetails}>
            <FormBillingDetails dataUser={dataLoginUser} formState={formState} onInputChange={onInputChange}/>
          </div>
          <div className={style.yourOrder}>
            <TableYourOrder handleClick={handleClickPay} properties={propertiesReadyToSend}/>
          </div>
        </div>) : <div style={{padding: "7rem"}}><center>"Login if you want to buy"</center></div>
      }
    </>
  );
};
