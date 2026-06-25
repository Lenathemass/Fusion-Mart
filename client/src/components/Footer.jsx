import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--dark-navy)', color: 'var(--text-light)', padding: '2rem 0' }}>
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>FusionMart</h5>
            <p>A Scalable Online Marketplace offering premium quality products.</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/products" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Products</a></li>
              <li><a href="/cart" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Cart</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>Email: support@fusionmart.com</p>
            <p>Phone: +1 234 567 890</p>
          </Col>
        </Row>
        <div className="text-center mt-3 pt-3 border-top border-secondary">
          <p>&copy; {new Date().getFullYear()} FusionMart. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
