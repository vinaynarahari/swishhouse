import React, { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  const addToCart = (event) => {
    setCart((prevCart) => [...prevCart, event]);
  };


  const removeFromCart = (eventId) => {
    setCart(cart.filter((event) => event.id !== eventId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
