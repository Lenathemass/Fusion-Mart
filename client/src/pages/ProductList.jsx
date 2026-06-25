import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = keyword
          ? `${import.meta.env.VITE_BACKEND_URL}/api/products?keyword=${keyword}`
          : `${import.meta.env.VITE_BACKEND_URL}/api/products`;
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">{keyword ? `Search Results for "${keyword}"` : 'All Products'}</h2>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <div className="text-center text-muted w-100">
            <p>No products found.</p>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
