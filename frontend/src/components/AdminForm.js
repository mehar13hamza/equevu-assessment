import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const AdminForm = ({title}) => {
  const [adminAuthValue, setAdminAuthValue] = useState('');
  const navigate = useNavigate();

  const handleAdminAuthSubmit = (e) => {
    e.preventDefault();

    // Perform authentication check here, e.g., send a request to the server

    // Simulate authentication success
    if (adminAuthValue === '1') {
      // Store the admin authentication value in local storage
      localStorage.setItem('X-ADMIN',  1);
      navigate("/applications");
    } else {
      alert('Invalid Value');
    }
  };

  return (
    <div>
      <div className='container text-center'>
        <h1>{title}</h1>
        <Form onSubmit={handleAdminAuthSubmit} className="container mt-4 w-25">
          <Form.Group className="m-3" controlId="fullName">
            <Form.Label>Authentication Value:</Form.Label>
            <Form.Control
              type="text"
              value={adminAuthValue}
              onChange={(e) => setAdminAuthValue(e.target.value)}
            />
            <Button className='mt-2' variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default AdminForm