import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../../assets/styles/ProductList.css'; 

function ProductList({ products, category, searchQuery }) {
  const filteredProducts = products.filter(product => {
    const matchesCategory = category ? product.category === category : true;
    const matchesSearchQuery = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <>
    
    <div className="row mb-4">
          <div className="col text-center">
            <h2 className="text-uppercase">Our products</h2>
            <p className="text-muted">Satisfy all customers!</p>
          </div>
        </div>
    <Row>
      {filteredProducts.map(product => (
        <Col sm={6} md={4} lg={3} key={product.id} className="product-card">
          <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={product.image} className="product-image" />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center">{product.name}</Card.Title>
              <Card.Text className="text-muted text-center">{product.description}</Card.Text>
              <Button variant="primary" className="mt-auto">${product.price}</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row></>
  );
}

export default ProductList;
