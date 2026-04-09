import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user?.role || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AdminGuard;
