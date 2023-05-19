import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AdminNavigation() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">HR SYSTEM</Navbar.Brand>
          <Nav>
            <Nav.Link href="/applications">All Applications</Nav.Link>
            <Nav.Link href="/download">Download Application</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default AdminNavigation