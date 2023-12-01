
import { BackButton } from "../BackButton/BackButton";
import style from "./Form.module.css";

export const Form = ({ children }) => {
  return (
    <>
    <BackButton/>
        <div
          className={`d-flex justify-content-center mt-2 ${style.containerLogin}`}
        >
          <div className={`${style.containerForm}`}>{children}</div>
        </div>
    </>
  );
};
