import imgTemp from "../../../assets/banner-food.jpg"
import style from './CartItem.module.css'

export const CartItem = () => {
  return (
    <>
      <tr>
        <td>
          <div className={style.containerCard}>
            <img className={style.image} src={imgTemp} />
            <div className={style.features}>
              <strong>Arroz árabe</strong>
              <br />
              <span>Descripción del producto</span>
              <br />
              <span>Más informacíon del producto ...</span>
            </div>
          </div>
        </td>
        <td>$7.5</td>
        <td>2</td>
        <td>$15</td>
        <td>
          <button className="btn btn-danger">Remove</button>
        </td>
      </tr>
    </>
  );
};
