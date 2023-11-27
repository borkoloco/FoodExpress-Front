import React, { useState } from "react";
import { CartItem } from "../../components/CartItem/CartItem";
import style from "./ShoppingCart.module.css";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllMenu } from "../../../redux/actions/action";

const ShoppingCart = () => {
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '[]')
  const [filterMenu, setFilterMenu] = useState([])
  const [subTotal, setSubtotal] = useState(0)

  const allMenu = useSelector((state) => state.allMenu);
  const dispatch = useDispatch()
  useEffect(() => {
    if (allMenu.length === 0) {
      dispatch(getAllMenu());
    }

    // allMenu.map((el) => {
    //   const idCart = cartProducts.map((cart) => {
    //     if (el.idMenu === cart.id) {
    //       filterMenu.push(el)
    //     }
    //   })
    // })
    // if (cartProducts.length > 0 && allMenu.length > 0) {
    //   const filteredMenu = allMenu.filter(menu => {
    //     return cartProducts.some(cart => menu.idMenu === cart.id);
    //   });


    //   if (filteredMenu.length > 0) {

    //     setFilterMenu(filteredMenu)
    //   }
    // }




  }, []);


  useEffect(() => {
    if (cartProducts.length > 0 && allMenu.length > 0) {
      const filteredMenu = allMenu.filter(menu => {
        return cartProducts.some(cart => menu.idMenu === cart.id);
      });


      if (filteredMenu.length > 0) {

        setFilterMenu(filteredMenu)
      }
    }
  }, [allMenu])

  // useEffect(() => {
  //   let addSubtotal = 0
  //   filterMenu && filterMenu.length > 0 && filterMenu.map((el) => {
  //     const amountId = cartProducts.filter((cart) => el.idMenu === cart.id)
  //     addSubtotal += parseFloat(el.price) * parseFloat(amountId.amount)
  //   })

  //   setSubtotal(addSubtotal)
  //   console.log(addSubtotal);
  //   return (addSubtotal)
  // }, [cartProducts])

  useEffect(() => {
    let addSubtotal = 0;

    filterMenu && filterMenu.length > 0 && filterMenu.forEach((el) => {
      const cartItem = cartProducts.find((cart) => el.idMenu === cart.id);

      if (cartItem) {
        addSubtotal += parseFloat(el.price) * parseFloat(cartItem.amount);
      }
    });

    setSubtotal(addSubtotal); // Redondear a dos decimales
  }, [cartProducts, filterMenu]);


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
                  {
                    filterMenu && filterMenu.length > 0 && filterMenu.map((el) => {
                      const amountId = cartProducts.filter((cart) => el.idMenu === cart.id)

                      return <CartItem
                        key={el.idMenu}
                        id={el.idMenu}
                        amount={amountId[0].amount}
                        imageUrl={el.imageUrl}
                        nameMenu={el.nameMenu}
                        price={el.price}
                        specialtyMenu={el.specialtyMenu}
                        typeMenu={el.typeMenu}
                        description={el.description}

                      />
                    })
                  }


                </tbody>
              </table>
            </div>

            <div className={style.container_}>
              <div className={`card ${style.containerTotal}`}>
                <div className="card-body">
                  <div className={style.feature}>
                    <p>Subtotal:</p>

                    {
                      subTotal && <p>${subTotal}</p>
                    }

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
                    {
                      subTotal && <p>${subTotal + 20}</p>
                    }
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
