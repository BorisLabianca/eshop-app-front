import { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  // Limit page numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  // Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Go to next page
  const goNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // Go to previous page
  const goPrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li
        onClick={goPrev}
        className={currentPage === pageNumbers[0] ? styles.hidden : null}
      >
        Prev
      </li>
      <>
        {pageNumbers.map((num) => {
          if (num < maxPageNumberLimit + 1 && num > minPageNumberLimit) {
            return (
              <li
                className={currentPage === num ? styles.active : null}
                key={num}
                onClick={() => paginate(num)}
              >
                {num}
              </li>
            );
          }
        })}
      </>
      <li
        onClick={goNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? styles.hidden
            : null
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`Page ${currentPage} `}</b>
        <span>{"of "}</span>
        <b>{Math.ceil(totalPages)}</b>
      </p>
    </ul>
  );
};

export default Pagination;
