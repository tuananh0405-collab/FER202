import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    const fetchData = async () => {
      const productsResponse = await axios.get("http://localhost:9999/products");
      const suppliersResponse = await axios.get("http://localhost:9999/suppliers");
      setProducts(productsResponse.data);
      setSuppliers(suppliersResponse.data);
      setFilteredProducts(productsResponse.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleFilterChange = (supplierId) => {
    let updatedSelectedSuppliers;
    if (selectedSuppliers.includes(supplierId)) {
      updatedSelectedSuppliers = selectedSuppliers.filter(id => id !== supplierId);
    } else {
      updatedSelectedSuppliers = [...selectedSuppliers, supplierId];
    }
    setSelectedSuppliers(updatedSelectedSuppliers);

    console.log("Selected suppliers:", updatedSelectedSuppliers);

    if (updatedSelectedSuppliers.length > 0) {
      setFilteredProducts(
        products.filter(product => updatedSelectedSuppliers.includes(String(product.supplier)))
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert("Your product has been added to the cart");
  };

  const truncateName = (name) => {
    return name.length > 20 ? name.substring(0, 20) + "..." : name;
  };

  return (
    <Container>
      <div className="header">
        <h2>FER202 COMPANY</h2>
        <Link to="/cart" className="text-decoration-none">
          <h2>Cart: [<span className="text-danger">{cart.length}</span>]</h2>
        </Link>
      </div>
      <Row>
        <Col sm={3} className="d-none d-sm-block">
          <Form>
            <Form.Group>
              <Form.Label> <h5 className="font-weight-bold">Filter by Suppliers</h5></Form.Label>
              {suppliers.map((supplier) => (
                <Form.Check
                  type="checkbox"
                  label={supplier.name}
                  key={supplier.id}
                  checked={selectedSuppliers.includes(supplier.id)}
                  onChange={() => handleFilterChange(String(supplier.id))}
                />
              ))}
            </Form.Group>
          </Form>
        </Col>
        <Col sm={9}>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={3} className="mb-3">
                <Card className="product-card">
                  <Card.Img
                    variant="top"
                    src={`/assets/images/${product.images[0].name}`}
                  />
                  <Card.Body>
                    <Card.Title>{truncateName(product.name)}</Card.Title>
                    <Card.Text>
                      Supplier:{" "}
                      {suppliers.find(supplier => supplier.id == product.supplier)?.name}
                    </Card.Text>
                    <Card.Text>
                      Price: {product.price.toLocaleString()} VND
                    </Card.Text>
                    <div className="button-row">
                      <Link to={`/product/${product.id}`}>
                        <Button variant="danger" className="mr-2 btn-sm">Details</Button>
                      </Link>
                      <Button variant="success" onClick={() => handleAddToCart(product)} className="btn-sm">Add to Cart</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductList;
