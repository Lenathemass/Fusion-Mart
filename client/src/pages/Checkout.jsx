import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Card, Image } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!user.mobile || !user.address) {
      toast.warning('Please update your mobile number and address before checkout.');
      navigate('/profile');
    }
  }, [user, navigate]);

  useEffect(() => {
    const qrMethods = ['UPI', 'GPay', 'PhonePe', 'Paytm'];
    setShowQR(qrMethods.includes(paymentMethod));
  }, [paymentMethod]);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2);

  const placeOrderHandler = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress: user.address,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        clearCart();
        toast.success('Order Placed Successfully!');
        navigate('/orders');
      } else {
        toast.error(data.message || 'Failed to place order');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {user?.name}
              </p>
              <p>
                <strong>Mobile: </strong> {user?.mobile}
              </p>
              <p>
                <strong>Address: </strong>
                {user?.address}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <Form>
                <Form.Group>
                  <Form.Label as="legend">Select Method</Form.Label>
                  <Col>
                    {['Cash on Delivery', 'UPI', 'Net Banking', 'GPay', 'PhonePe', 'Paytm'].map((method) => (
                      <Form.Check
                        key={method}
                        type="radio"
                        label={method}
                        id={method}
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    ))}
                  </Col>
                </Form.Group>
              </Form>

              {showQR && (
                <div className="mt-4 text-center">
                  <h5>Scan to Pay via {paymentMethod}</h5>
                  <Image src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=fusionmart@upi&pn=FusionMart" alt="Payment QR" thumbnail />
                </div>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.title} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.title}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x Rs. {item.price} = Rs. {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs. {itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs. {shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs. {taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs. {totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  style={{ backgroundColor: '#ff8c00', border: 'none' }}
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
