import React from 'react'
import {Nav, NavDropdown, Container, Navbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import {logoutUser} from '../actions/auth'

function UserNavbar(props) {

  const onLogoutClick = async () => {
    await props.logoutUser();
  }

  const loggedInLinks = (
    <>
      <Nav.Link href='/profiles'>Profiles</Nav.Link>
      <Nav.Link onClick={() => onLogoutClick()}>Logout</Nav.Link>
    </>
    
    
  );

  const loggedOutLinks = (
    <>
      <Nav.Link href='/profiles'>Profiles</Nav.Link>
      <Nav.Link href="/login">Sign In</Nav.Link>
      <Nav.Link href="/register">Sign Up</Nav.Link>
    </>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/dashboard" style={{marginLeft : 20}}>DevSoc</Navbar.Brand>
        <Container>
          
          <Nav className="col justify-content-end">
            {props.isAuthenticated ? loggedInLinks : loggedOutLinks}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, {logoutUser})(UserNavbar)