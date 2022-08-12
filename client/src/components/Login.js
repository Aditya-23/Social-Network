import React from 'react'
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import {useState} from 'react'

function Login() {
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

  return (
    <Container fluid display="flex" >
      {console.log(loginForm)}
      <Row style={{ marginTop: '50px' }}>
        <Col sm={{ span: 6, offset: 3}}>
          <Form>
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
          </Form>
        </Col>
          
        
      </Row>        
      
    </Container>
  )
}

export default Login;