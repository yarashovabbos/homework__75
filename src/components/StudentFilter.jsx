import React from 'react';
import { Form } from 'react-bootstrap';

const StudentFilter = ({ setFilterGroup }) => {
  const handleChange = (e) => {
    setFilterGroup(e.target.value);
  };

  return (
    <Form.Group controlId="formFilter">
      <Form.Label>Filter by Group</Form.Label>
      <Form.Control as="select" onChange={handleChange}>
        <option value="">All</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </Form.Control>
    </Form.Group>
  );
};

export default StudentFilter;