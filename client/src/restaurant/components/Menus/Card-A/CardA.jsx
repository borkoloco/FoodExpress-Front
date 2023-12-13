import { NavLink } from "react-router-dom";
import style from "./CardA.module.css";

export const CardA = ({ idMenu, nameMenu, description, imageUrl, price, available, typeMenu, specialtyMenu }) => {
  return (
    <>
      <div className={`card ${style.card}`} style={{ width: "18rem" }}>
        <NavLink to={`/menu/detail/${idMenu}`}>
          <img
            src={imageUrl}
            className={`card-img-top ${style.cardImage}`}
            alt={nameMenu}
          />
        </NavLink>

        <span className={style.cardCategories}>{typeMenu} / {specialtyMenu}</span>

        <div className="card-body">
          <NavLink className={style.deleteDecoration} to={`/menu/detail/${idMenu}`}>
            <h5 className={style.cardTitle}>{nameMenu}</h5>
          </NavLink>

          <p className={`card-text ${style.cardPrice}`}>
            $ {price}
          </p>

          {/* <span>
            ⭐⭐⭐⭐⭐
          </span> */}
        </div>
      </div>
    </>
  );
};
