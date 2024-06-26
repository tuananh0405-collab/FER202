import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, ListGroup, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9999/brand')
      .then(response => setBrands(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:9999/product')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleBrandFilter = (brandId) => {
    const newSelectedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter(id => id !== brandId)
      : [...selectedBrands, brandId];
    setSelectedBrands(newSelectedBrands);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <h4 className='text-info'>Filter by Brand</h4>
          <ListGroup>
            {brands.map(brand => (
              <ListGroup.Item key={brand.id}>
                <Form.Check
                  type="checkbox"
                  label={brand.name}
                  checked={selectedBrands.includes(parseInt(brand.id))}
                  onChange={() => handleBrandFilter(parseInt(brand.id))}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          <h4 className='text-info'>List Product</h4>
          <Form onSubmit={handleSearch}>
            <Form.Group>
              <Form.Control placeholder='Enter title to search' type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </Form.Group>
          </Form>
          <Link to={'/product/add'} className='text-primary font-weight-bold text-decoration-none mt-2 mb-2'>Create product</Link>

          <Table bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discount(%)</th>
                <th>Brand</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter(product => selectedBrands.length === 0 || selectedBrands.includes(parseInt(product.brand)))
                .filter(product => product.title.toLowerCase().startsWith(searchTerm.toLowerCase()))
                .map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.discountPercentage}</td>
                    <td>{brands.find(brand => brand.id == product.brand)?.name}</td>
                    <td>{product.category}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
