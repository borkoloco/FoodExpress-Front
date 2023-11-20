import React from "react";
import Card from "../Card/Card";
import Style from "./Cards.module.css";
import { setCurrentPage } from "../../redux/action/action";
import { useSelector, useDispatch } from "react-redux";

function Cards({ props }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);

  //*paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const menuToDisplay = props.slice(startIndex, endIndex);
  // Calcular la cantidad total de páginas
  const totalItems = props.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Crear un array de números para representar las páginas
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Función para cambiar la página actual
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };
  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  return (
    <div className={Style.bigDiv}>
      {menuToDisplay.map((plato, index) => {
        const {
          nameMenu,
          description,
          imageUrl,
          price,
          available,
          typeMenu,
          specialtyMenu,
        } = plato;
        return (
          <div key={index} className={Style.item}>
            <Card
              id={index}
              nameMenu={nameMenu}
              description={description}
              imageUrl={imageUrl}
              price={price}
              available={available}
              typeMenu={typeMenu}
              specialtyMenu={specialtyMenu}
            />
          </div>
        );
      })}

      <div>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          {"<"}
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Cards;
