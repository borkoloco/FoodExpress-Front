

import { NavLink } from "react-router-dom"
import style from "./Success.module.css"

export const SuccessPayment = () => {
  return (
    <div className={style.backgroundSuccess}>
        <h3>Your payment was successfully credited</h3>
        <p>Thank you for consuming at FoodExpress</p>
        <NavLink to="/home"><button className={style.buttonBack}> Back to home</button></NavLink>
    </div>
  )
}
