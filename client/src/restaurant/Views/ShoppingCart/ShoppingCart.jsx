import React, { useState } from "react";
import { CartItem } from "../../components/CartItem/CartItem";
import style from "./ShoppingCart.module.css";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllMenu } from "../../../redux/actions/action";
import { EmptyCart } from "../../../ui/components/EmptyCart/EmptyCart";
import { NavLink } from "react-router-dom";
import { validateSesion } from "../../../utils/validateSesion";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [filterMenu, setFilterMenu] = useState([]);
  const [subTotal, setSubtotal] = useState(0);

  const allMenuOriginal = useSelector((state) => state.allMenuOriginal);
  const allMenu = useSelector((state) => state.allMenu);
  const dispatch = useDispatch();

  const dataLoginUser = JSON.parse(localStorage.getItem('sesion'));
  const authenticated = validateSesion(dataLoginUser); //True: autenticado; false: no autenticado

  useEffect(() => {
    if (allMenu.length === 0) {
      dispatch(getAllMenu());
    }
  }, []);

  useEffect(() => {
    console.log("Componente renderizado");
  }, [filterMenu]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setFilterMenu([]);
    }
    if (cartItems.length > 0 && allMenuOriginal.length > 0) {
      const filteredMenu = allMenuOriginal.filter((menu) => {
        return cartItems.some((cart) => menu.idMenu === cart.id);
      });

      if (filteredMenu.length > 0) {
        setFilterMenu(filteredMenu);
      }
    }
  }, [allMenuOriginal, cartItems]);

  useEffect(() => {
    let addSubtotal = 0;

    filterMenu &&
      filterMenu.length > 0 &&
      filterMenu.forEach((el) => {
        const cartItem = cartItems.find((cart) => el.idMenu === cart.id);

        if (cartItem) {
          addSubtotal += parseFloat(el.price) * parseFloat(cartItem.amount);
        }
      });

    setSubtotal(addSubtotal); // Redondear a dos decimales
  }, [cartItems, filterMenu]);

  return (
    <>
      <div className={style.containerHeader}>
        <BackButton />
        <hr />
        <h2>Shopping cart</h2>
      </div>
      <div>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <div className={style.containerInfo}>
              <div className={`${style.tableContainer}`}>

                {/* Desktop */}
                <table className={`table ${style.hideResponsive}`}>
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {filterMenu &&
                      filterMenu.length > 0 &&
                      filterMenu.map((el) => {
                        const amountId = cartItems.filter(
                          (cart) => el.idMenu === cart.id
                        );
                        const amount = amountId[0]?.amount || 0;
                        return (
                          <CartItem
                            key={el.idMenu}
                            id={el.idMenu}
                            amount={amount}
                            imageUrl={el.imageUrl}
                            nameMenu={el.nameMenu}
                            price={el.price}
                            specialtyMenu={el.specialtyMenu}
                            typeMenu={el.typeMenu}
                            description={el.description}
                          />
                        );
                      })}
                  </tbody>
                </table>


                {/* Responsive */}
                <div className={style.showResponsive}>
                  {filterMenu &&
                    filterMenu.length > 0 &&
                    filterMenu.map((el) => {
                      const amountId = cartItems.filter(
                        (cart) => el.idMenu === cart.id
                      );
                      const amount = amountId[0]?.amount || 0;
                      return (
                        <CartItem
                          key={el.idMenu}
                          id={el.idMenu}
                          amount={amount}
                          imageUrl={el.imageUrl}
                          nameMenu={el.nameMenu}
                          price={el.price}
                          specialtyMenu={el.specialtyMenu}
                          typeMenu={el.typeMenu}
                          description={el.description}
                        />
                      );
                    })
                  }

                </div>


              </div>

              <div className={style.container_}>
                <div className={`card ${style.containerTotal}`}>
                  <div className="card-body">
                    <div className={style.feature}>
                      <p>Subtotal:</p>

                      {subTotal && <p>${subTotal}</p>}
                    </div>
                    <div className={style.feature}>
                      <p>Products:</p>
                      <p>{sumAmounts(cartItems,"amount")}</p>
                    </div>
                    <hr />
                    <div className={style.feature}>
                      <p>
                        <strong>Order total:</strong>
                      </p>
                      {subTotal && <p>${subTotal}</p>}
                    </div>
                    <NavLink to={authenticated ? "/checkout" : "/login"}>
                      <button className={style.btn}>Checkout</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;



const sumAmounts = (objectsArray, propertyName) => {
  const total = objectsArray.reduce((accumulator, currentValue) => {
    const value = currentValue[propertyName];
    return accumulator + (isNaN(value) ? 0 : value);
  }, 0);

  return total;
};