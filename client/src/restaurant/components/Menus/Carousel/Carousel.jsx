import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardA } from "../Card-A/CardA";
import style from "./Carousel.module.css"

export const Carousell = ({title,description,cards}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1250 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1250, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 564 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={style.containerCarousel}>
      <center>
          <h3 className={style.titleCarousel}>{title}</h3>
          <p className={style.descriptionCarousel}>{description}</p>
      </center>
      <center>
          <Carousel 
            responsive={responsive}
            swipeable={false}
            autoPlay={true}
            infinite={true}
            autoPlaySpeed={3000}
          >

            {
              cards.map((plato,index) =>(
                <CardA
                  key={`${index}${plato.idMenu}`}
                  idMenu={plato.idMenu}
                  nameMenu={plato.nameMenu}
                  description={plato.description}
                  imageUrl={plato.imageUrl}
                  price={plato.price}
                  available={plato.available}
                  typeMenu={plato.typeMenu}
                  specialtyMenu={plato.specialtyMenu}
                />
              ))
            }
            
          </Carousel>
      </center>
    </div>
  );
};
