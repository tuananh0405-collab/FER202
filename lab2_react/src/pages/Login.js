import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      onLogin();
      navigate('/');
    } else {
      setError('Email or password is incorrect');
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <Link to={'/'}><Button variant="outline-info">Back to Home</Button></Link>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Log In</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group className="form-outline mb-4">
                <Form.Label htmlFor="form3Example3">Email:</Form.Label>
                <Form.Control
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-outline mb-3">
                <Form.Label htmlFor="form3Example4">Password:</Form.Label>
                <Form.Control
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Form.Group className="form-check mb-0">
                  <Form.Check.Input
                    type="checkbox"
                    value=""
                    id="form2Example3"
                    className="form-check-input me-2"
                  />
                  <Form.Check.Label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </Form.Check.Label>
                </Form.Group>
                <Link to="#!" className="text-body">Forgot password?</Link>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <Link to="/register" className="link-danger">Register</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
