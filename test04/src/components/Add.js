import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/brand")
      .then((response) => setBrands(response.data))
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:9999/category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:9999/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "brand" || name === "category" ? parseInt(value) : value,
    });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Please enter the title.";
    if (formData.price <= 0) errors.price = "Price must be greater than 0.";
    if (formData.discountPercentage < 0 || formData.discountPercentage > 100)
      errors.discountPercentage =
        "The discount rate must be in the range of 0 to 100.";
    return errors;
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
      products.length > 0
        ? Math.max(...products.map((product) => parseInt(product.id))) + 1
        : 1;

        console.log(formData);
    axios
      .post("http://localhost:9999/product", {
        id: newId.toString(),
        ...formData,
        brand: parseInt(formData.brand),
        category: parseInt(formData.category),
        discountPercentage:parseFloat(formData.discountPercentage)
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <h2 className="d-flex justify-content-center">Create a new product</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                value="Auto Generated"
                disabled
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                isInvalid={!!formErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                isInvalid={!!formErrors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                isInvalid={!!formErrors.discountPercentage}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.discountPercentage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as="select"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-3 ">
          <div className="p-3">
            <Button variant="success" type="submit">Add</Button>
          </div>
          <div className="p-3">
            <Button variant="primary" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default Add;
