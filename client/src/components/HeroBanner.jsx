import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="hero-banner fade-in">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-start mb-4 mb-md-0">
            <h1>Discover Premium Quality Products</h1>
            <p className="mb-4">Shop the latest trends and best deals at FusionMart. Your one-stop shop for everything you need.</p>
            <Button as={Link} to="/products" className="btn-accent-custom btn-lg">
              Shop Now
            </Button>
          </Col>
          <Col md={6}>
            <img 
              src="/images/hero_banner.png" 
              alt="FusionMart Featured" 
              className="img-fluid rounded shadow" 
              style={{ objectFit: 'cover', width: '100%', maxHeight: '350px' }} 
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;
