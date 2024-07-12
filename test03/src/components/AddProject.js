import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AddProject = () => {
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    type: "",
    department: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:9999/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.description) {
      errors.description = "Description is required";
    }
    if (!formData.startDate) {
      errors.startDate = "Start date is required";
    }
    if (!formData.type) {
      errors.type = "Type is required";
    }
    if (!formData.department) {
      errors.department = "Department is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "department" ? parseInt(value) : value,
    });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("Please enter the form fields correctly.");
      return;
    }

    const newId =
      projects.length > 0
        ? Math.max(...projects.map((p) => parseInt(p.id)))+1
        : 1;
console.log(formData);
    axios
      .post("http://localhost:9999/projects", {
        id: newId.toString(),
        ...formData,
        department: parseInt(formData.department),
      })
      .then((response) => {
        setProjects([...projects, response.data]);
        console.log(response.data);
        navigate("/")

    })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <h2 className="d-flex justify-content-center">Add a new Project</h2>
      <Link to={"/"}>Home page</Link>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </Form.Control>
            </FormGroup>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default AddProject;
