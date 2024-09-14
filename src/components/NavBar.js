import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function NavBar() {
  
  return (
    <>
      <Navbar bg="dark" expand="md" data-bs-theme="dark" fixed='top'>
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"} style={{cursor:"pointer"}}>ExpressThoughts</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
