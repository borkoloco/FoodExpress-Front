import React, { useEffect, useState } from "react";
import utensEmpty from "../../../assets/icons/utens02Empty.svg";
import utensHalf from "../../../assets/icons/utens03Half.svg";
import utensFull from "../../../assets/icons/utens01Full.svg";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  cleanDetailMenu,
  getReviewsByUser,
  updateReviewById,
} from "../../../redux/actions/action";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../../ui/components/BackButton/BackButton";

const ReviewUser = () => {
  const datauser = JSON.parse(localStorage.getItem("sesion"));
  const idUser = datauser.idUser;
  const menuDetail = useSelector((state) => state.menuDetail);
  const reviewsByIdUser = useSelector((state) => state.reviewsByIdUser);
  const idMenu = menuDetail.idMenu;
  const nameProduct = menuDetail.nameMenu;
  const descProduct = menuDetail.description;
  const imgUrl = menuDetail.imageUrl;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [textEdit, setTextEdit] = useState("");
  const [textSubmit, setTextSubmit] = useState("Qualify");
  const [idReviewUpdate, setIdReviewUpdate] = useState();
  const maxCharacters = 250; // Máximo de caracteres permitidos para el comment
  const itemSize = 50; // Tamaño de los iconos de puntuación

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     await dispatch(getReviewsByUser(idUser));
    //   } catch (error) {
    //     console.error("Error en fetchData:", error);
    //   }
    // };
    // fetchData();

    if (reviewsByIdUser.length > 0) {
      for (let index = 0; index < reviewsByIdUser.length; index++) {
        if (idMenu == reviewsByIdUser[index].idMenu) {
          setComment(reviewsByIdUser[index].comment);
          setRating(reviewsByIdUser[index].rate);
          setTextEdit("Update your rating");
          setTextSubmit("Update");
          setIdReviewUpdate(reviewsByIdUser[index].idReview);
        }
      }
    }
    // return () => {
    //   dispatch(getReviewsByUser(0));
    //   dispatch(cleanDetailMenu());
    //   console.log("desmontado");
    // };
  }, []);

  const handleIconClick = (value) => {
    setRating(value);
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
  const handleSubmit = (textSubmit) => {
    //addReview = (value)  value debe ser { idUser, idMenu, rate, comment }
    if (!idUser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must Login",
        footer: "",
      });
      return;
    }
    if (!idMenu) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "We could not show the product you purchased",
        footer: "",
      });
      return;
    }

    if (rating === 0 || comment === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must rate and comment",
        footer: "",
      });
      return;
    }
    //evaluar si guardar review o actualizar existente
    switch (textSubmit) {
      case "Qualify":
        const dataSend = { idUser, idMenu, rate: rating, comment: comment };
        dispatch(addReview(dataSend));
        navigate(-1);
        break;
      case "Update":
        const dataSendUpdate = {
          id: idReviewUpdate,
          rate: rating,
          comment: comment,
        };
        dispatch(
          updateReviewById(
            dataSendUpdate.id,
            dataSendUpdate.rate,
            dataSendUpdate.comment
          )
        );
        navigate(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <BackButton />
      <br />
      <h4>What did you think of your product?</h4>
      <h5>{textEdit}</h5>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          src={imgUrl}
          alt="Plato"
          style={{ width: "300px", height: "auto" }}
        />

        <div>
          <p>
            <b>Product:</b> {nameProduct}
          </p>
          <p>
            <b>Description:</b> {descProduct}
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
      <h4>Tell us more about this dish</h4>
      {/* <label htmlFor="comment">Deja tus comentarios</label> */}
      <textarea
        id="comment"
        name="comment"
        rows="4"
        cols="50"
        placeholder="Enter your comment..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <div>
        <p>
          Characters: {comment.length} of {maxCharacters}
        </p>
      </div>

      <button
        type="button"
        name={textSubmit}
        onClick={() => handleSubmit(textSubmit)}
      >
        {textSubmit}
      </button>
      <p>
        This comment will be publicly visible. Do not use offensive terms, nor
        inappropriate words. Also do not enter passwords, addresses, no private
        data. Do not incite violence or involve minors age. Respect privacy
        laws.
      </p>
    </div>
  );
};

export default ReviewUser;
