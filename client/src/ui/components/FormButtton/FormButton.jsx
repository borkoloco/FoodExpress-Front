import style from "./FormButton.module.css";

/* Boton reutilizable para formularios */

export const FormButton = ({
  nameButton,
  outline = false,
  type,
  eventHandler,
  disabled = false,
}) => {

  return (
    <button
      disabled={disabled}
      onClick={eventHandler}
      type={type}
      className={`mb-3 ${style.btnForms} ${outline && style.btnOutline} ${disabled && style.btnDisabled}`}
    >
      {nameButton}
    </button>
  );
};
