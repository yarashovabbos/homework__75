import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginate = ({ studentsPerPage, totalStudents, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map(number => (
        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Paginate;