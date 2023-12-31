import { Link } from 'react-router-dom'
import { AddCart } from '../../../../ui/components/AddCart/AddCart'
import style from "./CardB.module.css";
import RatingStars from "../../../components/Reviews/RatingUtensil";
import { useSelector } from "react-redux";


export const CardB = ({ idMenu, nameMenu, description, imageUrl, price, available, typeMenu, specialtyMenu }) => {

  const reviewsAvgAll = useSelector((state) => state.reviewsAvgAll);

  let avgItem = 0;
  for (let index = 0; index < reviewsAvgAll.length; index++) {
    if (idMenu === reviewsAvgAll[index].idMenu) {
      avgItem = reviewsAvgAll[index].promedioRate;
    }
  }
  return (
    <div className={`${style.card} ${style.hoverEffect}`}>
      <div className={style.containerImage}>
        <Link to= {`/menu/detail/${idMenu}`}>
          <img
            className={style.cardImage}
            src={imageUrl}
            alt={nameMenu}
          />
        </Link>
      </div>

      <div className={style.containerElements}>
      <Link className={style.deleteDecoration} to= {`/menu/detail/${idMenu}`}>
        <h3 className={style.title}>{nameMenu}</h3>
      </Link>
        <span className={style.categories}>{typeMenu} / {specialtyMenu}</span>
        <RatingStars averageRating={avgItem || 0} />

        <p className={style.description}>
          {description}
        </p>

        <div className={style.endElements}>
          <span className={style.price}>$ {price}</span>
          <AddCart amount={1} id={idMenu} />
        </div>
      </div>
    </div>
  );
};


{/* <img className={style.cardImage} src="https://thefoodtech.com/wp-content/uploads/2022/05/burguer-king-hamburguesas-sin-ingredientes-artificiales.jpg" alt="dsdsd" /> */}