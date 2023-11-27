
import style from "./AddCart.module.css";
import { useLocalStorage } from "../../../utils/useLocalStorage";

export const AddCart = ({ amount, id }) => {
  const numAmount = parseInt(amount)
  if (numAmount < 1) {

    window.alert('La cantidad minima es 1')
  }

  const [cartProducts, setCartProducts] = useLocalStorage('cart', '[]')


  const addInput = () => {

    const data = { id: parseInt(id), amount: parseInt(amount) }
    let flag = false;
    let index
    let newAmount

    const newCartProducts = cartProducts.map((el, ind) => {
      if (el.id == id) {
        newAmount = parseInt(el.amount) + parseInt(amount)
        flag = true
        return { ...el, amount: newAmount }
      } else {
        return { ...el }
      }

    })
    if (flag === true) {
      console.log('entra en true');
      setCartProducts(newCartProducts)
    } else {
      if (amount && amount >= 1) {
        console.log('entra en el false');
        setCartProducts([...cartProducts, data])
      }
    }




  }









  return (
    <div>
      <button className={`card-link ${style.btnAdd}`} onClick={addInput}>Add to Car</button>

    </div>
  )
};