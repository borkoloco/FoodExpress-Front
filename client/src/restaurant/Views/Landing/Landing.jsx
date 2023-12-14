import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import { Carousell } from "../../components/Menus/Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMenu } from "../../../redux/actions/action";
import { Loading2 } from "../../../ui/components/Loading2/Loading2";


const Landing = () => {

  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.allMenu);
  const [force, setForce] = useState(true);
  const [loading, setLoading] = useState(false);

  const getMenus = async() => {
    await dispatch(getAllMenu());
    setLoading(true);
  }
  
  useEffect( () => {
    getMenus();
  }, []);

  useEffect(() => {
    setForce(!force);
  }, [allMenu]);



  return (
    <>
      <div id={`${style.heroSlider}`} className="carousel slide z-0 ">
        <div className="carousel-inner">
          <div
            className={`carousel-item text-center vh-100 active ${style.slide_1} ${style.bg_cover}`}
          >
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h6 className="text-white">Welcome to Food Express</h6>
                  <h1 className="display-1 fw-bold text-white">
                    A wonderful catalog of menus to delight your palate
                  </h1>
                  <Link to="/menus">
                    <button className={`${style.btn} ${style.btn_brand}`}>
                      See more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RESERVAS */}
          {/* <div
            className={`carousel-item text-center vh-100 ${style.slide_2} ${style.bg_cover}`}
          >
            <div className="container h-100 d-flex align-items-center justify-content-center slide-2">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h6 className="text-white">Welcome to Food Express</h6>
                  <h1 className="display-1 fw-bold text-white">
                    Guarantee your place and enjoy with your family
                  </h1>
                  <Link to="/bookings">
                    <button className={`${style.btn} ${style.btn_brand}`}>
                      Reserve now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* BOTONES PARA NAVEGAR */}
        {/* <div>
          <button
            className={`carousel-control-prev`}
            type="button"
            data-bs-target={`#${style.heroSlider}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className={`carousel-control-next `}
            type="button"
            data-bs-target={`#${style.heroSlider}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
      </div>
      {
        loading ? (<Carousell
          title="Menu of the day"
          description="Experience our rotating menu with fresh and varied flavors daily at our restaurant, a unique culinary journey"
          cards={allMenu}
        />) : <center><Loading2/></center>
      }
      

    </>
  );
};

export default Landing;
