import { NavLink } from "react-router-dom";
import style from "./Footer.module.css";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {

  const phoneNumber = "543408674244";
  const message = "Hola Food Express, necesito hacerles una consulta";

  const handleClick = () => {
    sendWhatsApp(phoneNumber, message);
  };
  return (
    <>
        <footer className={`${style.footer}`}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>About</h5>
                <p>
                Discover a range of culinary delights. From classic dishes to innovative creations, find your next favorite flavor with us at our food store.
                </p>
              </div>
              <div className="col-md-4">
                <h5>Contact us</h5>
                <ul>
                  <li>
                  <span>Email: foodExpress@gmail.com</span>
                  </li>
                  <li>
                    <NavLink to="/comments">Send us a comment</NavLink>
                  </li>
                  <li>
                    <div className={style.btnWhatsapp}>
                      <FaWhatsapp
                        // onClick={handleClick}
                        style={{
                          cursor: "pointer",
                          fontSize: "2em",
                          color: "#25D366",
                        }}
                      />
                    </div>
                  </li>

                </ul>
              </div>
              <div className="col-md-4">
                <h5>Locate us in</h5>
                <p>Street, Alfonso Gómez 33 2 28037 Córdova</p>
                
                <span>Phone: +54 3408 67-4244</span>
              </div>
            </div>
          </div>
        </footer>
          <div className={style.AllRigth}>
            <span>All rights Reserved 2024</span>
          </div>
    </>
  );
};
