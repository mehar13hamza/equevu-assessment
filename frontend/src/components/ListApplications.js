import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const ListApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/candidates/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-ADMIN': localStorage.getItem('X-ADMIN') || '',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Flatten the nested arrays into a single array
        const flattenedData = [].concat(...data);
        setApplications(flattenedData);
      })
      .catch((error) => console.error('Error fetching applications:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Applications</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Years of Experience</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.full_name}</td>
              <td>{application.date_of_birth}</td>
              <td>{application.years_of_experience}</td>
              <td>{application.department}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListApplications;
