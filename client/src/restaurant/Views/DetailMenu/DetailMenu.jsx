import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanDetailMenu,
  getMenuDetailById,
} from "../../../redux/actions/action";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { AddCart } from "../../../ui/components/AddCart/AddCart";
import style from "./DetailMenu.module.css";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { useState } from "react";
import { Loading } from "../../../ui/components/Loading/Loading";
import RatingStars from "../../components/Reviews/RatingUtensil";
import { getAvgReviewByIdMenu } from "../../../redux/actions/action";

const DetailMenu = () => {
  const { id } = useParams();

  const menuDetail = useSelector((state) => state.menuDetail);
  const reviewAVGbyIdMenu = useSelector((state) => state.reviewAVGbyIdMenu);

  const dispatch = useDispatch();
  const [amountValue, setAmountValue] = useState(1);

  useEffect(() => {
    dispatch(getMenuDetailById(id));
    dispatch(getAvgReviewByIdMenu(id));
    return () => {
      dispatch(cleanDetailMenu());
    };
  }, [id]);

  const handleInputCart = (value) => {
    setAmountValue(value);
  };
  useEffect(() => {
    console.log(amountValue);
  }, [amountValue]);

  const [cartProducts, setCartProducts] = useLocalStorage("cart", "[]");

  return (
    <>
      <div className={style.containerHeader}>
        <BackButton />
        <hr />
      </div>
      {menuDetail.nameMenu ? (
        <div className={style.containerCard}>
          <div className="row">
            {/* Imagen y galería del menu */}
            <div className="col-md-5">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={menuDetail.imageUrl}
                      className="d-block w-100"
                      alt={menuDetail.nameMenu}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={menuDetail.imageUrl}
                      className="d-block w-100"
                      alt={menuDetail.nameMenu}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={menuDetail.imageUrl}
                      className="d-block w-100"
                      alt={menuDetail.nameMenu}
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            {/* Detalles del menú */}
            <div className="col-md-7">
              {/* <p className={`${style.newArrival} text-center`}>NEW</p> */}
              <h2>{menuDetail.nameMenu}</h2>{" "}

              <span>Product ID: MEN{menuDetail.idMenu}U</span>
              <RatingStars averageRating={reviewAVGbyIdMenu} iconSize={40} />
              <p className={style.price}>$ {menuDetail.price}</p>
              <p>
                <b>Description:</b> {menuDetail.description}
              </p>
              <p>
                {menuDetail.typeMenu} - {menuDetail.specialtyMenu}
              </p>
              <p>
                <b>Available: </b> 5
              </p>
              <label>
                <b>Quantity: </b>&nbsp;
                <input
                  className={style.quantityInput}
                  type="number"
                  onChange={(el) => handleInputCart(el.target.value)}
                  defaultValue={amountValue}
                />
              </label>
              <AddCart amount={amountValue} id={id} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {/* AQUI PODEMOS HACER EL APARTADO DE REVIEWS O COMENTARIOS */}
      {/* <div className="card border-light mb-3" >
        <div className="card-header">APARTADO DE COMENTARIOS/CALIFICACIÓN</div>
        <div className="card-body">
          <h5 className="card-title">Ya se verá!</h5>
          <p className="card-text">
            Bocetar este apartado. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero debitis autem accusamus! Possimus dolores sit facilis necessitatibus tempore nemo obcaecati. Maiores id tempora dignissimos architecto ipsam eaque praesentium magni quia.
          </p>
        </div>
      </div> */}
    </>
  );
};

export default DetailMenu;
