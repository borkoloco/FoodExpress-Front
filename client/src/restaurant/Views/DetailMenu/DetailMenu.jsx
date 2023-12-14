import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanDetailMenu,
  getMenuDetailById,
  getReviewsByMenu,
} from "../../../redux/actions/action";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { AddCart } from "../../../ui/components/AddCart/AddCart";
import style from "./DetailMenu.module.css";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { useState } from "react";
import { Loading } from "../../../ui/components/Loading/Loading";
import RatingStars from "../../components/Reviews/RatingUtensil";
import { getAvgReviewByIdMenu } from "../../../redux/actions/action";
import { ToastContainer, toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import { sendWhatsApp } from "../../../utils/links";

const DetailMenu = () => {
  const { id } = useParams();
  const menuDetail = useSelector((state) => state.menuDetail);
  const reviewAVGbyIdMenu = useSelector((state) => state.reviewAVGbyIdMenu);
  const reviewsByIdMenu = useSelector((state) => state.reviewsByIdMenu);
  const dispatch = useDispatch();
  const [amountValue, setAmountValue] = useState(1);
  const [cartProducts, setCartProducts] = useLocalStorage("cart", "[]");
  const phoneNumber = "543408674244";
  const [available, setAvailable] = useState(5);

  useEffect(() => {
    dispatch(getMenuDetailById(id));
    dispatch(getAvgReviewByIdMenu(id));
    dispatch(getReviewsByMenu(id));
    return () => {
      dispatch(cleanDetailMenu());
      dispatch(getReviewsByMenu(0));
    };
  }, [id]);

  const handleInputCart = (value) => {
    const numericValue = Number(value);

    // Verificar si numericValue es un número válido y mayor o igual a 1
    if (!isNaN(numericValue) && numericValue >= 1) {
      // Verificar si numericValue es menor o igual a available
      if (numericValue <= available) {
        setAmountValue(numericValue);
      } else {
        // Si numericValue es mayor que available, establecer amountValue en available
        setAmountValue(available);
      }
    }
  };
  // const handleInputCart = (value) => {
  //   if (Number(amountValue) <= Number(available)) {
  //     setAmountValue(value);
  //   }
  // };
  // useEffect(() => {
  //   console.log(amountValue);
  // }, [amountValue]);

  const handleClick = () => {
    const message = `Hola Food Express, estoy interesado en el siguiente producto: %0A Nombre: ${menuDetail.nameMenu} %0A Descripción: ${menuDetail.description}%0A Precio: $${menuDetail.price}`;
    sendWhatsApp(phoneNumber, message);
  };

  // const handleClick = () => {
  //   sendWhatsApp(phoneNumber, message);
  // };
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
                  {/* <button
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
                  ></button> */}
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={menuDetail.imageUrl}
                      className="d-block w-100"
                      alt={menuDetail.nameMenu}
                    />
                  </div>
                  {/* <div className="carousel-item">
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
                  </div> */}
                </div>
                {/* <button
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
                </button> */}
                {/* <button
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
                </button> */}
              </div>
            </div>

            {/* Detalles del menú */}
            <div className="col-md-7">
              {/* <p className={`${style.newArrival} text-center`}>NEW</p> */}
              <h2 className="mb-0">{menuDetail.nameMenu}</h2>{" "}
              <span className={style.title}>
                Product ID: MEN{menuDetail.idMenu}U
              </span>
              {reviewAVGbyIdMenu !== "0.0" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <RatingStars
                    averageRating={reviewAVGbyIdMenu}
                    iconSize={30}
                  />
                  <span style={{ marginRight: "10px" }}>
                    {"(" + reviewAVGbyIdMenu + ")"}
                  </span>
                </div>
              )}
              {reviewAVGbyIdMenu === "0.0" && (
                <div>
                  <RatingStars
                    averageRating={reviewAVGbyIdMenu}
                    iconSize={40}
                  />
                </div>
              )}
              <p className={style.price}>$ {menuDetail.price}</p>
              <p>
                <b>Description:</b> {menuDetail.description}
              </p>
              <p>
                {menuDetail.typeMenu} - {menuDetail.specialtyMenu}
              </p>
              <p>
                <b>Available: </b> {available}
              </p>
              <label>
                <b>Quantity: </b>&nbsp;
                <input
                  className={style.quantityInput}
                  type="number"
                  onChange={(el) => handleInputCart(el.target.value)}
                  //defaultValue={amountValue}
                  value={amountValue}
                />
              </label>
              <div
                style={{
                  display: "flex",
                  //justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className={style.containerAddCart}>
                  <AddCart amount={amountValue} id={id} />
                </div>
                {"  "}
                <div className={style.containerAddCart}>
                  <FaWhatsapp
                    onClick={handleClick}
                    style={{
                      cursor: "pointer",
                      fontSize: "2em",
                      color: "#25D366",
                      marginLeft: "1rem",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {/* AQUI PODEMOS HACER EL APARTADO DE REVIEWS O COMENTARIOS */}
      <div className={`mb-5 ${style.containerReviews}`}>
        {reviewsByIdMenu.length > 0 && (
          <h4 className="card-header">Reviews about this product</h4>
        )}
        <div className="card-body">
          <hr />
          {reviewsByIdMenu.map((review, index) => (
            <div key={review.idReview}>
              {review.idStatus !== 0 && (
                <div>
                  {review.idStatus === 3 ? (
                    <div>
                      <span className={style.fecha}>{review.date}</span>
                      <div className="mt-2 mb-2">
                        <RatingStars
                          averageRating={review.rate}
                          iconSize={30}
                        />
                      </div>
                      <p className={style.comment}>
                        Este comentario fue rechazado por el moderador.
                      </p>
                    </div>
                  ) : review.idStatus === 2 ? (
                    <div>
                      <span className={style.fecha}>{review.date}</span>
                      <div className="mt-2 mb-2">
                        <RatingStars
                          averageRating={review.rate}
                          iconSize={30}
                        />
                      </div>
                      <p className={style.comment}>{review.comment}</p>
                    </div>
                  ) : (
                    <div>
                      <span className={style.fecha}>{review.date}</span>
                      <div className="mt-2 mb-2">
                        <RatingStars
                          averageRating={review.rate}
                          iconSize={30}
                        />
                      </div>
                      <p className={style.comment}>
                        Comentario pendiente de moderación
                      </p>
                    </div>
                  )}
                </div>
              )}
              {index < reviewsByIdMenu.length - 1 && <hr />}{" "}
              {/* Inserta hr entre elementos, excepto después del último */}
            </div>
          ))}
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default DetailMenu;
