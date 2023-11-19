import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanDetailMenu,
  getMenuDetailByName,
} from "../../redux/action/action";
import { AddCart, BackButton } from "../../components";
import style from "./DetailMenu.module.css";

const DetailMenu = () => {
  const { name } = useParams();

  const menuDetail = useSelector((state) => state.menuDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(name);

    dispatch(getMenuDetailByName(name));
    return () => {
      dispatch(cleanDetailMenu());
    };
  }, [name]);

  return (
    <>
      <BackButton />
      {menuDetail.nameMenu ? (
        <div className={style.containerCard}>
          <div className="row">
            {/* Imagen y galería del menu */}
            <div className="col-md-5">
              <div id="carouselExampleIndicators" class="carousel slide">
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
              <p className={`${style.newArrival} text-center`}>NEW</p>
              <h2>{menuDetail.nameMenu}</h2>
              <p>Product id: IDSR2344</p>
              <p>⭐⭐⭐⭐⭐</p>
              <p>
                {menuDetail.description} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Similique reprehenderit aperiam sint ad ipsa
                deleniti, repellendus molestias saepe blanditiis commodi
                repudiandae ratione qui sit nostrum, sed totam est nam fugiat.
              </p>
              <p>
                <b>Tipo: </b>
                {menuDetail.typeMenu}
              </p>
              <p>
                <b>Especial: </b>
                {menuDetail.specialtyMenu}
              </p>
              <p>
                <b>Disponibilidad: </b>5
              </p>
              <p className={style.price}>$.15.00</p>
              <label>
                <b>Cantidad: </b>
              </label>
              <input className={style.quantityInput} type="number" value={1} />
              <AddCart />
            </div>
          </div>
        </div>
      ) : (
        <img
          className={style.imgLoading}
          src="https://media.tenor.com/SWJCs0u0Tr0AAAAC/taco-tacos.gif"
          alt="Loading"
        />
      )}

      {/* AQUI PODEMOS HACER EL APARTADO DE REVIEWS O COMENTARIOS */}
      <div className="card border-light mb-3" >
        <div className="card-header">APARTADO DE COMENTARIOS/CALIFICACIÓN</div>
        <div className="card-body">
          <h5 className="card-title">Ya se verá!</h5>
          <p className="card-text">
            Bocetar este apartado. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero debitis autem accusamus! Possimus dolores sit facilis necessitatibus tempore nemo obcaecati. Maiores id tempora dignissimos architecto ipsam eaque praesentium magni quia.
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailMenu;
