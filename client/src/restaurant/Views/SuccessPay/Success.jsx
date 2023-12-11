

import style from "./Success.module.css"

export const SuccessPayment = () => {
  return (
    <div className={style.backgroundSuccess}>
        <h3>Your payment was successfully credited</h3>
        <p>Thank you for consuming at FoodExpress</p>
        <button className={style.buttonBack}> Back to home</button>
    </div>
  )
}
