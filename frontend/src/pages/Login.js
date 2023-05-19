import React from 'react';
import Navigation from '../components/Navigation';
import AdminForm from '../components/AdminForm';

const Login = () => {
  return (
    <div>
      <Navigation />
      <AdminForm title="Admin Authentication" />
    </div>
  );
};

export default Login