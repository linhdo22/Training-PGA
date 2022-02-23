import React from "react";

import { pagination } from "../utils";

interface Props {
  pagesLength: number;
  currentPage: number;
  setPage(page: number): void;
}

function TablePaginationCompoent(props: Props) {
  const { pagesLength, currentPage, setPage } = props;
  const pageNumbers = pagination(pagesLength, currentPage, 2);
  const handleNextPage = () => {
    if (currentPage < pagesLength) {
      setPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };
  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage == 1 && "disabled"}`}>
          <span className="page-link" onClick={() => setPage(1)}>
            First
          </span>
        </li>
        <li className={`page-item ${currentPage == 1 && "disabled"}`}>
          <span className="page-link" onClick={handlePreviousPage}>
            &laquo;
          </span>
        </li>
        {pageNumbers.map((number) => (
          <li
            className={`page-item ${currentPage == number && "active"}`}
            key={number}
            onClick={() => setPage(number)}
          >
            <span className="page-link">{number}</span>
          </li>
        ))}
        <li className={`page-item ${currentPage == pagesLength && "disabled"}`}>
          <span className="page-link" onClick={handleNextPage}>
            &raquo;
          </span>
        </li>
        <li className={`page-item ${currentPage == pagesLength && "disabled"}`}>
          <span className="page-link" onClick={() => setPage(pagesLength)}>
            Last
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(TablePaginationCompoent);
