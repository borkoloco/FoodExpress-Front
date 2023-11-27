import React, { useEffect } from "react";
import Card from "../Card/Card";
import Style from "./Cards.module.css";
import { setCurrentPage } from "../../../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";

function Cards({ props }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  const input = useSelector((state) => state.input);

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

  /*Ubica en la pagina 1 cuando se busca */
  useEffect(() => {
    if (input.length > 2) {
      dispatch(setCurrentPage(1));

    }
  }, [input]);

  return (
    <div className={Style.container_}>
      <div className={Style.bigDiv}>
        {menuToDisplay.map((plato, index) => {
          const {
            idMenu,
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
                idMenu={idMenu}
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
      </div>

      {/* Paginación */}
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={goToPreviousPage} disabled={currentPage === 1}>{"<"}</button>
          </li>
          {pages.map((page) => (
            <li className={`page-item ${currentPage === page ? "active" : ""}`} aria-current="page">
              <button
                className="page-link"
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={goToNextPage} disabled={currentPage === totalPages}>{">"}</button>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default Cards;
