// /components/web/pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { CartManager } from '../services/CartManager';
import { apiService } from '../services/ApiService';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const cartManager = new CartManager();

  useEffect(() => {
    const items = cartManager.getCart();
    setCartItems(items);
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, []);

  const handleCheckout = async () => {
    try {
      await apiService.post('/checkout', { items: cartItems, total });
      cartManager.clearCart();
      setCartItems([]);
      setTotal(0);
      alert('Checkout successful!');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          <p>{item.name} - Quantity: {item.quantity} - ${item.price * item.quantity}</p>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={handleCheckout}>Complete Purchase</button>
    </div>
  );
}

export default Checkout;