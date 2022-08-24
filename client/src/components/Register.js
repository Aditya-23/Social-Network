import React from 'react'
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import {useState} from 'react'
import {connect} from 'react-redux'
import {setAlert} from '../actions/alert'
import {authAction} from '../actions/auth'
import {Navigate} from 'react-router-dom'

function Register(props) {

  const [registerForm, setRegisterForm] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
  })

  const onChangeHandler = (e) => {
    setRegisterForm((form) => {
      return (
        {
          ...form,
          [e.target.name] : e.target.value
        }
      )
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(registerForm.password != registerForm.confirmPassword){
      props.setAlert("Passwords don't match", "danger");
    }      
    else{
      const userObj = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password
      };
      props.authAction(userObj);
    }
      
  }

  if(props.isAuthenticated){
    return (
      <Navigate to="/" />
    )
  }

  return (
    <Container fluid display="flex" >
      {console.log(registerForm)}
      <Row style={{ marginTop: '50px' }}>
        <Col sm={{ span: 6, offset: 3}}>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" name='name' value={registerForm.name} onChange={e => onChangeHandler(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={registerForm.email} onChange={e => onChangeHandler(e)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' value={registerForm.password} onChange={e => onChangeHandler(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" name='confirmPassword' value={registerForm.confirmPassword} onChange={e => onChangeHandler(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            
          </form>
        </Col>
          
        
      </Row>        
      
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
};

export default connect(mapStateToProps, {setAlert, authAction})(Register)