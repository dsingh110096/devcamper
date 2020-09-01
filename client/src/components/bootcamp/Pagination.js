import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ itemPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  const condition = Math.ceil(totalItems / itemPerPage);
  for (let i = 1; i <= condition; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <Link
              className='page-link'
              onClick={() => paginate(number)}
              to={`?page=${number}`}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
