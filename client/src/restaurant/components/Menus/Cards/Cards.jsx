import React, { useEffect } from "react";
import Card from "../Card/Card";
import Style from "./Cards.module.css";
import { getAllAvg, setCurrentPage } from "../../../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../Pagination/Pagination";

function Cards({ props }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  const input = useSelector((state) => state.input);
  const reviewsAvgAll = useSelector((state) => state.reviewsAvgAll);

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

  useEffect(() => {
    dispatch(getAllAvg());
  }, []);

  /*Ubica en la pagina 1 cuando se busca */
  useEffect(() => {
    if (input.length > 2) {
      dispatch(setCurrentPage(1));
    }
  }, [input]);

  return (
    <div className={Style.container_}>
      <Pagination
        currentPage={currentPage}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        handlePageChange={handlePageChange}
        pages={pages}
        totalPages={totalPages}
      />

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
      <Pagination
        currentPage={currentPage}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        handlePageChange={handlePageChange}
        pages={pages}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Cards;
