import utensFull from "../../../assets/icons/utens01Full.svg";
import utensEmpty from "../../../assets/icons/utens02Empty.svg";
import utensHalf from "../../../assets/icons/utens03Half.svg";

const RatingStars = ({ averageRating, iconSize }) => {
  const stars = [];
  // Tamaño deseado para las imágenes de calificación
  const imageSize = {
    width: iconSize || "23px", // Usa iconSize si está presente, de lo contrario, usa el valor predeterminado
    height: iconSize || "22px",
  };

  for (let i = 1; i <= 5; i++) {
    if (i <= averageRating) {
      stars.push(
        <img src={utensFull} alt="Full Utensil" key={i} style={imageSize} />
      );
    } else if (i - 0.5 === averageRating) {
      stars.push(
        <img src={utensHalf} alt="Half Utensil" key={i} style={imageSize} />
      );
    } else {
      stars.push(
        <img src={utensEmpty} alt="Empty Utensil" key={i} style={imageSize} />
      );
    }
  }

  return <div>{stars}</div>;
};

export default RatingStars;

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faStar,
//   faStarHalf,
//   faStarEmpty,
// } from "@fortawesome/free-solid-svg-icons";

// const RatingStars = ({ averageRating }) => {
//   const stars = [];

//   for (let i = 1; i <= 5; i++) {
//     if (i <= averageRating) {
//       stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
//     } else if (i - 0.5 === averageRating) {
//       stars.push(<FontAwesomeIcon icon={faStarHalf} key={i} />);
//     } else {
//       stars.push(<FontAwesomeIcon icon={faStarEmpty} key={i} />);
//     }
//   }

//   return <div>{stars}</div>;
// };

// export default RatingStars;
