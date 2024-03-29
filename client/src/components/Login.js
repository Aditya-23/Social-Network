import React, { Fragment } from 'react'
import {Container, Row, Col, Form, Button, Spinner} from "react-bootstrap"
import {useState} from 'react'
import {connect} from 'react-redux'
import { loginUser } from '../actions/auth'
import {Navigate, useNavigate} from 'react-router-dom'
import store from '../store'
import { REMOVE_ALERT } from '../actions/types'
import { removeAlert } from '../actions/alert'

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate();
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
    await props.loginUser(loginForm);
  }

  if(props.auth.loading){
    return (<Fragment>
      <Spinner/>
    </Fragment>) 
  }

  if(props.auth.isAuthenticated){
    navigate("/dashboard");
  }

  const alertCloseButton = () => {
    props.removeAlert();
  }

  return (
    <Container fluid display="flex" >
      {props.alert.msg != null ? 
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {props.alert.msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => alertCloseButton()}></button>
      </div> : null}      
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
    auth: state.auth,
    alert: state.alertReducer
  }
};

export default connect(mapStateToProps, {loginUser, removeAlert})(Login);