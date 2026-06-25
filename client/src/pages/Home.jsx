import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        const data = await response.json();
        // Show up to 8 products so the belt and shoe appear
        setProducts(data.products.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <HeroBanner />
      <h2 className="my-5 text-center">Featured Products</h2>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <div className="text-center text-muted w-100">
            <p>Loading products...</p>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Home;
