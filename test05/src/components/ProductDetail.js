import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productResponse = await axios.get(`http://localhost:9999/products/${id}`);
      setProduct(productResponse.data);
      setMainImage(`/assets/images/${productResponse.data.images[0].name}`);
      const supplierResponse = await axios.get(`http://localhost:9999/suppliers/${productResponse.data.supplier}`);
      setSupplier(supplierResponse.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageHover = (image) => {
    setMainImage(`/assets/images/${image}`);
  };

  return (
    <Container>
      <Button variant='success' href="/">Go to Home</Button>
      <h2 className="my-3">PRODUCT DETAIL</h2>
      <Card>
        <Row>
          <Col md={6}>
            <Image src={mainImage} alt={product.name} fluid />
            <Row className="mt-3">
              {product.images.map((image) => (
                <Col key={image.id} xs={3}>
                  <Image
                    src={`/assets/images/${image.name}`}
                    alt={product.name}
                    thumbnail
                    onMouseOver={() => handleImageHover(image.name)}
                    className="border"
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Price: {product.price.toLocaleString()} VND</Card.Text>
              <Card.Text>Supplier: {supplier?.name}</Card.Text>
              <Card.Text >Status: {product.status ? <span className='text-success'>In stock</span> :  <span className='text-danger'>Out of stock</span>}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ProductDetail;
