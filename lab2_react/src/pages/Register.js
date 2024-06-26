import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      setError('User with this email already exists');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
                <p className="text-center fw-bold mx-3 mb-0">Create an account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form.Group className="form-outline mb-4">
                <Form.Label htmlFor="form3Example1">Name:</Form.Label>
                <Form.Control
                  type="text"
                  id="form3Example1"
                  className="form-control form-control-lg"
                  placeholder="Vu Tuan Anh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-outline mb-4">
                <Form.Label htmlFor="form3Example2">Email:</Form.Label>
                <Form.Control
                  type="email"
                  id="form3Example2"
                  className="form-control form-control-lg"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-outline mb-3">
                <Form.Label htmlFor="form3Example3">Password:</Form.Label>
                <Form.Control
                  type="password"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-outline mb-3">
                <Form.Label htmlFor="form3Example4">Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Register
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account? <Link to="/login" className="link-danger">Login</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
