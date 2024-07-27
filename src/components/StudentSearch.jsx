import React from 'react';
import { Form } from 'react-bootstrap';

const StudentSearch = ({ setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Form.Group controlId="formSearch">
      <Form.Label>Search</Form.Label>
      <Form.Control type="text" placeholder="Search by first or last name" onChange={handleChange} />
    </Form.Group>
  );
};

export default StudentSearch;