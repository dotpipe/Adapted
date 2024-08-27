// /components/mobile/screens/CartScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { CartManager } from '../services/CartManager';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const cartManager = new CartManager();

  useEffect(() => {
    setCartItems(cartManager.getCart());
  }, []);

  const removeItem = (itemId) => {
    cartManager.removeFromCart(itemId);
    setCartItems(cartManager.getCart());
  };

  return (
    <View>
      <Text>Cart Screen</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - Quantity: {item.quantity}</Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default CartScreen;