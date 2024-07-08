import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; 

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(i)}>
              {i}
            </button>
          </li>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
      }

      if (startPage > 1) {
        pageNumbers.push(
          <li key={1} className={`page-item ${1 === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
        );
        if (startPage > 2) {
          pageNumbers.push(
            <li key="dots-start" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(i)}>
              {i}
            </button>
          </li>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(
            <li key="dots-end" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
        pageNumbers.push(
          <li key={totalPages} className={`page-item ${totalPages === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </li>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation example" className="pagination-container">
      <ul className="pagination justify-content-center flex-wrap">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(1)} aria-label="First">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} aria-label="Previous">
            <span aria-hidden="true">&lsaquo;</span>
          </button>
        </li>
        {renderPageNumbers()}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} aria-label="Next">
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(totalPages)} aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
