import React from 'react'
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import {useState} from 'react'

function Register() {

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


  return (
    <Container fluid display="flex" >
      {console.log(registerForm)}
      <Row style={{ marginTop: '50px' }}>
        <Col sm={{ span: 6, offset: 3}}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" name='name' value={registerForm.name} onChange={e => onChangeHandler(e)}/>
        
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={registerForm.email} onChange={e => onChangeHandler(e)}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" name='password' value={registerForm.password} onChange={e => onChangeHandler(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password again" name='confirmPassword' value={registerForm.confirmPassword} onChange={e => onChangeHandler(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="I agree to all the terms and conditions." />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
          
        
      </Row>        
      
    </Container>
  )
}

export default Register