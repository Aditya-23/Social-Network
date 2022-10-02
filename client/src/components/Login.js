import React from 'react'
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import {useState} from 'react'
import {connect} from 'react-redux'
import { loginUser } from '../actions/auth'
import {Navigate} from 'react-router-dom'

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email : "",
    password : ""
  })

  const onChangeHandler = (e) => {
    setloginForm((form) => {
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
    props.loginUser(loginForm);
  }

  if(props.isAuthenticated){
    return (
      <Navigate to="/dashboard" />
    )
  }

  return (
    <Container fluid display="flex" >
      {console.log(loginForm)}
      <Row style={{ marginTop: '50px' }}>
        <Col sm={{ span: 6, offset: 3}}>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={loginForm.email} onChange={e => onChangeHandler(e)}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' value={loginForm.password} onChange={e => onChangeHandler(e)}/>
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

export default connect(mapStateToProps, {loginUser})(Login);