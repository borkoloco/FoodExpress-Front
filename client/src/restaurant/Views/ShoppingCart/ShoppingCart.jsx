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

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [filterMenu, setFilterMenu] = useState([]);
  const [subTotal, setSubtotal] = useState(0);

  const allMenuOriginal = useSelector((state) => state.allMenuOriginal);
  const allMenu = useSelector((state) => state.allMenu);
  const dispatch = useDispatch();
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
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Subtotal</th>
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
              </div>

              <div className={style.container_}>
                <div className={`card ${style.containerTotal}`}>
                  <div className="card-body">
                    <div className={style.feature}>
                      <p>Subtotal:</p>

                      {subTotal && <p>${subTotal}</p>}
                    </div>
                    <div className={style.feature}>
                      <p>Shipping fee:</p>
                      <p>$20</p>
                    </div>
                    <hr />
                    <div className={style.feature}>
                      <p>
                        <strong>Order total:</strong>
                      </p>
                      {subTotal && <p>${subTotal + 20}</p>}
                    </div>
                    <NavLink to="/checkout">
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
