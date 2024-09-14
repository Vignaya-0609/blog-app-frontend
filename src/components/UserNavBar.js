import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
function UserNavBar() {
  return (
    <Navbar bg="dark" expand="md" data-bs-theme="dark" fixed='top'>
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"} style={{cursor:"pointer"}}>ExpressThoughts</Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav>
                <Nav.Link as={Link} to={"/user/dashboard"}>Dashboard</Nav.Link>
                <Nav.Link as={Link} to={"/user/blog"}>My Blog</Nav.Link>
                <Nav.Link as={Link} to={"/"}>Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse> 
        </Container>
      </Navbar>
  )
}

export default UserNavBar