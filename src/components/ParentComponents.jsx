// ParentComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';

const ParentComponent = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [nextId, setNextId] = useState(1); // Initialize ID

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:3000/students')
      .then(response => {
        setStudents(response.data);
        // Update the nextId based on the highest existing ID
        const highestId = Math.max(...response.data.map(student => student.id), 0);
        setNextId(highestId + 1);
      })
      .catch(error => console.error(error));
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div>
      <StudentForm
        setStudents={setStudents}
        fetchStudents={fetchStudents}
        editingStudent={editingStudent}
        handleCancelEdit={handleCancelEdit}
        nextId={nextId}
        setNextId={setNextId}
      />
      {/* Render list of students */}
    </div>
  );
};

export default ParentComponent;
