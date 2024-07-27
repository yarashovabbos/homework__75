// src/components/ListItems.js
import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {
  const navigate = useNavigate();

  return (
    <>
      <ListItemButton onClick={() => navigate('/dashboard/students')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/dashboard/teachers')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Teachers" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/dashboard/profile')}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </>
  );
};
