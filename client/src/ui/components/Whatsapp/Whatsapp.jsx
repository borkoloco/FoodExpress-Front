import { sendWhatsApp } from "../../../utils/links";
import style from "./Whatsapp.module.css";

import { FaWhatsapp } from "react-icons/fa";

export const Whatsapp = () => {
  const phoneNumber = "543408674244";
  const message = "Hola Food Express, necesito hacerles una consulta";
  
  const handleClick = () => {
    sendWhatsApp(phoneNumber, message);
  };
  return (
    <div className={style.btnwsp}>
      <FaWhatsapp
        onClick={handleClick}
        style={{
          cursor: "pointer",
        }}
      />
    </div>
  );
};
