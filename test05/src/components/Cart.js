import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleClearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Container>
      <h2 className="d-flex justify-content-center text-success">FER202 COMPANY</h2>
      <Link to="/">
        <Button variant="success" className="mb-3">
          Go to Home
        </Button>
      </Link>
      {cart.length === 0 ? (
        <div className="d-flex justify-content-center text-danger">EMPTY CART</div>
      ) : (
        <>
        <div className="d-flex flex-row-reverse">
            <Button variant="danger" onClick={handleClearCart}>
              Clear cart
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product name</th>
                <th>Image</th>
                <th>Price (vnd)</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`/assets/images/${item.images[0].name}`}
                      alt={item.name}
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{item.price.toLocaleString()}</td>
                  <td>1</td>
                  <td>{item.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <p className="d-flex flex-row-reverse">
              Total: {calculateTotal().toLocaleString()} VND
            </p>
            <p className="d-flex flex-row-reverse">
              VAT: {(calculateTotal() * 0.08).toLocaleString()} VND
            </p>
            <p className="d-flex flex-row-reverse">
              Total (VAT): {(calculateTotal() * 1.08).toLocaleString()} VND
            </p>
          </div>
          
        </>
      )}
    </Container>
  );
}

export default Cart;
