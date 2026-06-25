import React, { useContext } from 'react';
import { Container, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2 className="mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>
              Your cart is empty <Link to="/">Go Back</Link>
            </p>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.title} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`} className="text-decoration-none text-dark">
                        {item.title}
                      </Link>
                    </Col>
                    <Col md={2}>Rs. {item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) => addToCart({ ...item, _id: item.product }, Number(e.target.value) - item.quantity)}
                      >
                        {[...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCart(item.product)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
                </h2>
                Rs. 
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  style={{ backgroundColor: '#ff8c00', border: 'none' }}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
