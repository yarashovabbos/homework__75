import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherForm from './TeacherForm';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pagination.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [teachersPerPage] = useState(5);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
  };

  const handleCancelEdit = () => {
    setEditingTeacher(null);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const filteredTeachers = teachers.filter(teacher => 
    teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(teacher => 
    filterLevel ? teacher.level === filterLevel : true
  );

  const offset = currentPage * teachersPerPage;
  const currentTeachers = filteredTeachers.slice(offset, offset + teachersPerPage);
  const pageCount = Math.ceil(filteredTeachers.length / teachersPerPage);

  return (
    <div className="container mt-4">
      <h2>Teacher List</h2>
      <div className="form-inline mb-4">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Search by first or last name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="form-control" onChange={(e) => setFilterLevel(e.target.value)}>
          <option value="">All Levels</option>
          <option value="Senior">Senior</option>
          <option value="Middle">Middle</option>
          <option value="Junior">Junior</option>
        </select>
      </div>
      <TeacherForm setTeachers={setTeachers} fetchTeachers={fetchTeachers} editingTeacher={editingTeacher} handleCancelEdit={handleCancelEdit} />
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map(teacher => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.level}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(teacher)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(teacher.id)}>Delete</button>
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
        activeClassName={'active'}
      />
    </div>
  );
};

export default TeacherList;
