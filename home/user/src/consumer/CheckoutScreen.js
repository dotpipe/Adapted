// components/consumer/CheckoutScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import { auth, database } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CheckoutScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!address || !paymentMethod) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to checkout');
      return;
    }

    try {
      const orderRef = await addDoc(collection(database, 'orders'), {
        userId: user.uid,
        items: cartItems,
        total: calculateTotal(),
        address,
        paymentMethod,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      dispatch(clearCart());
      Alert.alert('Success', 'Your order has been placed!', [
        { text: 'OK', onPress: () => navigation.navigate('OrderConfirmation', { orderId: orderRef.id }) }
      ]);
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'There was a problem placing your order. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TextInput
        style={styles.input}
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Method"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;