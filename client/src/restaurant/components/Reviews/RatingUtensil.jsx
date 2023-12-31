import utensFull from "../../../assets/icons/utens01Full.svg";
import utensEmpty from "../../../assets/icons/utens02Empty.svg";
import utensHalf from "../../../assets/icons/utens03Half.svg";

const RatingStars = ({ averageRating, iconSize }) => {
  const stars = [];
  averageRating = Math.round(averageRating * 2) / 2;
  // Tamaño deseado para las imágenes de calificación
  const imageSize = {
    width: iconSize || "20px", // Usa iconSize si está presente, de lo contrario, usa el valor predeterminado
    height: iconSize || "20px",
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
