import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ setStudents, fetchStudents, editingStudent, handleCancelEdit, getNextId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [group, setGroup] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setFirstName(editingStudent.firstName);
      setLastName(editingStudent.lastName);
      setGroup(editingStudent.group);
    } else {
      setFirstName('');
      setLastName('');
      setGroup('');
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      axios.put(`http://localhost:3000/students/${editingStudent.id}`, { firstName, lastName, group })
        .then(response => {
          fetchStudents();
          handleCancelEdit();
        })
        .catch(error => console.error(error));
    } else {
      const newStudent = {
        id: getNextId(),
        firstName,
        lastName,
        group
      };
      axios.post('http://localhost:3000/students', newStudent)
        .then(response => {
          fetchStudents();
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>First Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Group</label>
        <input 
          type="text" 
          className="form-control" 
          value={group} 
          onChange={(e) => setGroup(e.target.value)} 
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editingStudent ? 'Update' : 'Create'}
      </button>
      {editingStudent && (
        <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default StudentForm;
