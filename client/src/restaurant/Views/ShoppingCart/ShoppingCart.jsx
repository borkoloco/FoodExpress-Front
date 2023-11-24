import React from "react";
import { CartItem } from "../../components/CartItem/CartItem";
import style from "./ShoppingCart.module.css";
import { BackButton } from "../../../ui/components/BackButton/BackButton";

const ShoppingCart = () => {
  return (
    <>
      <BackButton />
      <div className="container mt-4">
        <h2>Shopping cart</h2>
        <div className="container">
          <div className="d-flex justify-content-around flex-row">
            <div>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <CartItem />
                  <CartItem />
                </tbody>
              </table>
            </div>

            <div className={style.container_}>
              <div className={`card ${style.containerTotal}`}>
                <div className="card-body">
                  <div className={style.feature}>
                    <p>Subtotal:</p>
                    <p>$20</p>
                  </div>
                  <div className={style.feature}>
                    <p>Shipping free:</p>
                    <p>$20</p>
                  </div>
                  <hr />
                  <div className={style.feature}>
                    <p>
                      <strong>Order total:</strong>
                    </p>
                    <p>$20</p>
                  </div>
                  <button className={style.btn}>Checkout</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
