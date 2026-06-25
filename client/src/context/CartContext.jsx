import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartInfo = localStorage.getItem('cartItems');
    if (cartInfo) {
      setCartItems(JSON.parse(cartInfo));
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x.product === product._id);
      let updatedItems;
      if (existItem) {
        updatedItems = prevItems.map((x) =>
          x.product === existItem.product ? { ...x, quantity: x.quantity + quantity } : x
        );
      } else {
        updatedItems = [...prevItems, { 
          product: product._id, 
          title: product.title, 
          image: product.image, 
          price: product.price, 
          quantity 
        }];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((x) => x.product !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
