import { useNavigate } from "react-router-dom";
import style from "./BackButton.module.css";

export const BackButton = () => {
  const navigate = useNavigate();

  const onHandleClick = () => navigate(-1); //navega hacia atrás
  return (
    <button className={style.btnBack} onClick={onHandleClick}>
      ⬅ back
    </button>
  );
};
