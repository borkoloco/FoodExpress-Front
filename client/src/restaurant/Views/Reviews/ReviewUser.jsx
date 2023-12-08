import React, { useState } from "react";
import utensEmpty from "../../../assets/icons/utens02Empty.svg";
import utensHalf from "../../../assets/icons/utens03Half.svg";
import utensFull from "../../../assets/icons/utens01Full.svg";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addReview } from "../../../redux/actions/action";

const ReviewUser = ({ idUser, idMenu, nameProduct, descProduct, imgUrl }) => {
  //!eliminar estas lineas
  idUser = 3;
  idMenu = 7;
  nameProduct = "Empanada Giga";
  descProduct =
    "Una buena empanada muy saciante para que llenes ese buche trabajador.";
  imgUrl =
    "http://res.cloudinary.com/foodexpressimg/image/upload/v1701849632/tk7gznipzznzjqn3lqww.jpg";

  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const maxCharacters = 250; // Máximo de caracteres permitidos para el comment
  const itemSize = 50; // Tamaño de los iconos de puntuación

  const handleIconClick = (value) => {
    setRating(value);
    console.log(value);
  };

  const handleIconHover = (value) => {
    setHoveredRating(value);
  };

  const handleIconLeave = () => {
    setHoveredRating(0);
  };

  const handleCommentChange = (event) => {
    const inputValue = event.target.value;
    // Limitar la longitud del comentario a maxCharacters
    if (inputValue.length <= maxCharacters) {
      setComment(inputValue);
    }
  };

  //!acciones del boton Enviar comentario
  const handleSubmit = () => {
    //addReview = (value)  value debe ser { idUser, idMenu, rate, comment }
    if (!idUser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error, no estás logueado",
        footer: "",
      });
      return;
    }
    if (!idMenu) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error, no pudimos obtener el producto que compraste",
        footer: "",
      });
      return;
    }
    if (rating === 0 || comment === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes calificar y comentar",
        footer: "",
      });
      return;
    }

    const dataSend = { idUser, idMenu, rate: rating, comment: comment };
    dispatch(addReview(dataSend));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <br />
      <h4>Qué te pareció tu producto?</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img src={imgUrl} alt="" />

        <div>
          <p>
            <b>Producto:</b> {nameProduct}
          </p>
          <p>
            <b>Descripción:</b> {descProduct}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((index) => (
          <img
            key={index}
            src={
              index <= (hoveredRating || rating)
                ? utensFull
                : index - 0.5 === hoveredRating
                ? utensHalf
                : utensEmpty
            }
            alt={`Icono ${index}`}
            style={{ width: itemSize, height: itemSize, cursor: "pointer" }}
            onClick={() => handleIconClick(index)}
            onMouseEnter={() => handleIconHover(index)}
            onMouseLeave={handleIconLeave}
          />
        ))}
      </div>
      <h4>Contanos más acerca de este plato</h4>
      {/* <label htmlFor="comment">Deja tus comentarios</label> */}
      <textarea
        id="comment"
        name="comment"
        rows="4"
        cols="50"
        placeholder="Ingresa tu comentario aquí..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <div>
        <p>
          Caracteres: {comment.length} de {maxCharacters}
        </p>
      </div>

      <button type="button" onClick={handleSubmit}>
        Enviar
      </button>
      <p>
        Este comentario será visible públicamente. No uses términos ofensivos,
        ni palabras inapropiadas. Tampoco introduzcas contraseñas, direcciones,
        ni datos privados. No incites a la violencia ni involucres a menores de
        edad. Respeta las leyes de privacidad.
      </p>
    </div>
  );
};

export default ReviewUser;