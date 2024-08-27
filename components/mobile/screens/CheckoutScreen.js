// /components/mobile/screens/CheckoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { CartManager } from '../services/CartManager';
import { apiService } from '../services/ApiService';

const CheckoutScreen = ({ navigation }) => {
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
      navigation.navigate('Home');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <View>
      <Text>Checkout</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - Quantity: {item.quantity} - ${item.price * item.quantity}</Text>
        )}
      />
      <Text>Total: ${total.toFixed(2)}</Text>
      <Button title="Complete Purchase" onPress={handleCheckout} />
    </View>
  );
};

export default CheckoutScreen;