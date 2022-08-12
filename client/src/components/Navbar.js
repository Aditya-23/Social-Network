import React from 'react'
import {Nav, NavDropdown, Container, Navbar} from 'react-bootstrap'

function UserNavbar() {
  return (
    <>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" style={{marginLeft : 20}}>DevSoc</Navbar.Brand>
        <Container>
          
          <Nav className="col justify-content-end">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="login">Sign In</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default UserNavbar