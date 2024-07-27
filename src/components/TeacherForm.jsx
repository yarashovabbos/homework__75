import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherForm = ({ setTeachers, fetchTeachers, editingTeacher, handleCancelEdit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingTeacher) {
      setFirstName(editingTeacher.firstName);
      setLastName(editingTeacher.lastName);
      setLevel(editingTeacher.level);
      setIsEditing(true);
    } else {
      setFirstName('');
      setLastName('');
      setLevel('');
      setIsEditing(false);
    }
  }, [editingTeacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacher = { firstName, lastName, level };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/teachers/${editingTeacher.id}`, teacher);
        fetchTeachers();
        handleCancelEdit();
      } else {
        const response = await axios.get('http://localhost:3000/teachers');
        const teachers = response.data;
        const newId = teachers.length ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
        await axios.post('http://localhost:3000/teachers', { id: newId, ...teacher });
        fetchTeachers();
      }
    } catch (error) {
      console.error("Error submitting teacher:", error);
    }

    setFirstName('');
    setLastName('');
    setLevel('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="level">Level</label>
        <select
          className="form-control"
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        >
          <option value="">Select Level</option>
          <option value="Senior">Senior</option>
          <option value="Middle">Middle</option>
          <option value="Junior">Junior</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">{isEditing ? 'Update' : 'Add'} Teacher</button>
      {isEditing && (
        <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={handleCancelEdit}>Cancel</button>
      )}
    </form>
  );
};

export default TeacherForm;
