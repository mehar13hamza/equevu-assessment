import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ApplicationForm = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [department, setDepartment] = useState('');
  const [resume, setResume] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be submitted
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('years_of_experience', yearsOfExperience);
    formData.append('department', department);
    formData.append('resume', resume);

    // Perform file extension validation
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = resume ? resume.name.split('.').pop().toLowerCase() : '';
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage('Only PDF and Word documents are allowed.');
      return;
    }

    // Perform the API request to submit the application
    fetch('http://127.0.0.1:8000/api/candidates/registration/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log('Application submitted:', data);
        // Reset the form fields
        setFullName('');
        setDateOfBirth('');
        setYearsOfExperience('');
        setDepartment('');
        setResume(null);
        // Show the popup
        setShowPopup(true);
        setErrorMessage('');
      })
      .catch((error) => {
        // Handle the error
        console.error('Error submitting application:', error);
      });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
    <Form onSubmit={handleSubmit} className="container mt-4">
      <Form.Group className="mb-3" controlId="fullName">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="dateOfBirth">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="yearsOfExperience">
        <Form.Label>Years of Experience:</Form.Label>
        <Form.Control
          type="number"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="department">
        <Form.Label>Department:</Form.Label>
        <Form.Control
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="resume">
        <Form.Label>Resume:</Form.Label>
        <Form.Control type="file" onChange={handleResumeChange} />
      </Form.Group>
      {/* Error message */}
      {errorMessage && (
        <div className="alert alert-danger mt-4" role="alert">
          {errorMessage}
        </div>
      )}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
    {/* Success popup */}
    <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your application has been submitted successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  );
};

export default ApplicationForm;
