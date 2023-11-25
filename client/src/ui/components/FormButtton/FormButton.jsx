
import style from "./FormButton.module.css";

export const FormButton = ({nameButton,outline = false,type,eventHandler}) => {
  return (
    <button type={type} class={`mb-3 ${style.btnForms} ${(outline) && (style.btnOutline)}`}>
    {nameButton}
  </button>
  )
}
