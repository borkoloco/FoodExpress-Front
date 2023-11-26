import { Link } from "react-router-dom";
import style from "./Landing.module.css";


const Landing = () => {
  return (
    <div id={`${style.heroSlider}`} className="carousel slide">
      <div className="carousel-inner">
        <div
          className={`carousel-item text-center vh-100 active ${style.slide_1} ${style.bg_cover}`}
        >
          <div className="container h-100 d-flex align-items-center justify-content-center">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h6 className="text-white">Welcome to Food Express</h6>
                <h1 className="display-1 fw-bold text-white">
                  Un catálogo maravilloso para deleitar tu paladar.
                </h1>
                <Link to="/home">
                  <button className={`${style.btn} ${style.btn_brand}`}>
                    Pedir ahora
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`carousel-item text-center vh-100 ${style.slide_2} ${style.bg_cover}`}
        >
          <div className="container h-100 d-flex align-items-center justify-content-center slide-2">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h6 className="text-white">Welcome to Food Express</h6>
                <h1 className="display-1 fw-bold text-white">
                  Garantiza tu lugar y disfruta junto a tu familia
                </h1>
                <Link to="/reservation">
                  <button className={`${style.btn} ${style.btn_brand}`}>
                    Reservar ahora
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${style.heroSlider}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${style.heroSlider}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};


export default Landing;