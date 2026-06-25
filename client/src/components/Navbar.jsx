import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar as BootstrapNavbar, Badge, Form, Button } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`);
    } else {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BootstrapNavbar expand="lg" className="navbar-custom" variant="dark">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <strong>FusionMart</strong>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex ms-auto me-auto w-50" onSubmit={submitHandler}>
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              <FaSearch />
            </Button>
          </Form>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart /> Cart
              <Badge pill bg="warning" text="dark" className="ms-1">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </Badge>
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FaUser /> {user.name}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <FaUser /> Sign In
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
