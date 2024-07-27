import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pagination.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [studentsPerPage] = useState(5);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:3000/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/students/${id}`)
      .then(() => fetchStudents())
      .catch(error => console.error(error));
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(student => 
    filterGroup ? student.group === filterGroup : true
  );

  const offset = currentPage * studentsPerPage;
  const currentStudents = filteredStudents.slice(offset, offset + studentsPerPage);
  const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);

  const getNextId = () => {
    const maxId = students.reduce((max, student) => (student.id > max ? student.id : max), 0);
    return maxId + 1;
  };

  return (
    <div className="container mt-4">
      <h2>Student List</h2>
      <div className="form-inline mb-4">
        <input 
          type="text" 
          className="form-control mr-2" 
          placeholder="Search by first or last name" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="form-control" onChange={(e) => setFilterGroup(e.target.value)}>
          <option value="">All Groups</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <StudentForm 
        setStudents={setStudents} 
        fetchStudents={fetchStudents} 
        editingStudent={editingStudent} 
        handleCancelEdit={handleCancelEdit}
        getNextId={getNextId}
      />
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(student)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default StudentList;

