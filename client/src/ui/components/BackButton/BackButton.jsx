import { useNavigate } from "react-router-dom";
import style from "./BackButton.module.css";
import arrowback from "../../../assets/arrow-back.svg";

export const BackButton = () => {
  const navigate = useNavigate();

  const onHandleClick = () => navigate(-1); //navega hacia atrás
  return (
    <button className={style.btnBack} onClick={onHandleClick}>
      <img src={arrowback} alt="arrow-back" /> back
    </button>
  );
};
