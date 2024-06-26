import React, { useState } from 'react';
import { Navbar, Form, FormControl, Button , NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/Navbar.css'; 
import logo from '../../assets/images/img02.jpg'
const NavbarComponent = ({ isLoggedIn, onLogout, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="BrandLogo"
        />{' '}
        VTA_HE181442
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline onSubmit={handleSearch} className="search-form">
          <FormControl
            type="text"
            placeholder="Search something..."
            className="mr-sm-2 search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="link" type="submit" className="search-button">
            <i className="fa fa-search"></i>S
          </Button>
        </Form>
        {isLoggedIn ? (
          <NavDropdown title="User Avatar" id="basic-nav-dropdown" className="ml-3">
            <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <div className="auth-buttons ml-3">
            <Link to="/login" className="btn btn-primary mr-2">Login</Link>
            <Link to="/register" className="btn btn-outline-primary">Sign up</Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
