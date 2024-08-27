// /components/web/pages/Cart.js
import React, { useEffect, useState } from 'react';
import { CartManager } from '../services/CartManager';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const cartManager = new CartManager();

  useEffect(() => {
    setCartItems(cartManager.getCart());
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map(item => (
        <div key={item.id}>{item.name} - Quantity: {item.quantity}</div>
      ))}
    </div>
  );
}

export default Cart;