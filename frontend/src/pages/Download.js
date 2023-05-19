import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AdminNavigation from '../components/AdminNavigation';

const Download = () => {
  const [resumeId, setResumeId] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [error, setError] = useState('');

  const handleDownload = () => {
    fetch(`http://127.0.0.1:8000/api/candidates/${resumeId}/resume/`, {
      method: 'GET',
      headers: {
        'X-ADMIN': localStorage.getItem('X-ADMIN') || '',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Resume not found');
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a temporary URL for the blob
        const url = URL.createObjectURL(blob);
        setResumeUrl(url);
        setError('');
      })
      .catch((error) => {
        console.error('Error downloading resume:', error);
        setResumeUrl('');
        setError('Resume not found');
      });
  };

  const handleIdChange = (e) => {
    setResumeId(e.target.value);
  };

  return (
    <>
    <AdminNavigation />
    <div className="container mt-4">
      <h1>Download Resume</h1>
      <Form>
        <Form.Group controlId="resumeId" className='w-25'>
          <Form.Label>Enter Resume ID:</Form.Label>
          <Form.Control
            type="text"
            value={resumeId}
            onChange={handleIdChange}
            placeholder="Resume ID"
          />
        </Form.Group>
        <Button variant="primary" className='mt-2' onClick={handleDownload}>
          Download
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {resumeUrl && (
        <div>
          <h3>Resume Download:</h3>
          <a href={resumeUrl} download="resume.pdf">
            Click here to download the resume
          </a>
        </div>
      )}
    </div>
    </>
  );
};

export default Download;
