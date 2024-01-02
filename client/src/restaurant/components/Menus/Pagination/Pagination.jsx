

import styles from "./Pagination.module.css"

export const Pagination = ({goToPreviousPage,goToNextPage,handlePageChange,currentPage, pages, totalPages}) => {
  return (
    <div className={styles.containerPagination}>
      {/* Paginación */}
      <div className={styles.pagination}>
        <button
          className={styles.pageLink}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.pageLink} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
        <button
          className={styles.pageLink}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
