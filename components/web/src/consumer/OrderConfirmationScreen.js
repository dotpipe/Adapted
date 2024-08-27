// components/consumer/OrderConfirmationScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { database } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const OrderConfirmationScreen = ({ route }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const orderRef = doc(database, 'orders', orderId);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        setOrder({ id: orderSnap.id, ...orderSnap.data() });
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmation</Text>
      <Text style={styles.orderNumber}>Order Number: {order.id}</Text>
      <Text style={styles.thankYou}>Thank you for your order!</Text>
      <Text style={styles.status}>Status: {order.status}</Text>
      <Text style={styles.total}>Total: ${order.total.toFixed(2)}</Text>
      <Text style={styles.address}>Delivery Address: {order.address}</Text>
      <Text style={styles.items}>Items:</Text>
      {order.items.map((item, index) => (
        <Text key={index} style={styles.item}>
          {item.name} - Quantity: {item.quantity}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 18,
    marginBottom: 10,
  },
  thankYou: {
    fontSize: 16,
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    marginBottom: 20,
  },
  items: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default OrderConfirmationScreen;