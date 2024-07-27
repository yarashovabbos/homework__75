// src/ProfilePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ username: "", password: "" });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile data from API
    axios.get('http://localhost:3000/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Save profile data to API
    axios.put('http://localhost:3000/profile', profile)
      .then(response => {
        setProfile(response.data);
        setEditing(false);
      })
      .catch(error => console.error(error));
  };

  const handleLogout = () => {
    // Handle logout (e.g., clear auth tokens, redirect to login page)
    // For now, we'll just navigate to the home page
    navigate('/');
  };

  return (
    <Container>
      <Box mt={4}>
        <h2>Profile</h2>
        <TextField
          label="Username"
          name="username"
          value={profile.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!editing}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={profile.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!editing}
        />
        {editing ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}
        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ ml: 2 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;
