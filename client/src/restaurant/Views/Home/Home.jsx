import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import Cards from "../../components/Menus/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import {getAllMenu,} from "../../../redux/actions/action";
import { Loading } from "../../../ui/components/Loading/Loading";
import { ToastContainer } from "react-toastify";
import { Filters } from "../../../ui/components/Filters/Filters";

function Home() {
  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.allMenu);
  const [force, setForce] = useState(true);

  useEffect(() => {
    setForce(!force);
  }, [allMenu]);

  useEffect(() => {
    if (allMenu.length === 0) {
      dispatch(getAllMenu());
    }
  }, []);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 
  const filteredMenu = allMenu.filter((menu) => menu.available);
  return (
    <div className={Style.background_home}>

      <div className={Style.containerHeader}>
        <h2 className="text-light pt-4">Menus</h2>
        <hr className="text-light" />
      </div>

      <div className={`${Style.bigDiv}`}>

        <div className={Style.barDiv}>
        {windowSize.width > 600 ? (
            <Filters />
          ) : (
            <Filters responsive={true} />
          )}
          
        </div>

        
        

        <div className={Style.cardsDiv}>
          {filteredMenu && allMenu.length > 0 ? (
            <Cards props={filteredMenu} />
          ) : (
            <Loading />
          )}
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
    </div>
  );
}

export default Home;
