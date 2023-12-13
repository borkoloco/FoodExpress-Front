

import style from "./Pagination.module.css"

export const Pagination = ({goToPreviousPage,goToNextPage,handlePageChange,currentPage, pages, totalPages}) => {
  return (
    <div className={style.containerPagination}>
      {/* Paginación */}
      <nav aria-label="...">
        <ul className="pagination ">
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
              aria-current="page"
            >
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
            <button
              className="page-link"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
