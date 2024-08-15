// components/store/OrderManagementScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { database } from '../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const OrderManagementScreen = ({ storeId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const ordersRef = collection(database, 'orders');
    const q = query(ordersRef, where('storeId', '==', storeId));
    const querySnapshot = await getDocs(q);
    const orderData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrders(orderData);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const orderRef = doc(database, 'orders', orderId);
    await updateDoc(orderRef, { status: newStatus });
    fetchOrders(); // Refresh the order list
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderNumber}>Order #{item.id}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Total: ${item.total.toFixed(2)}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => updateOrderStatus(item.id, 'processing')}
        >
          <Text style={styles.actionButtonText}>Process</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => updateOrderStatus(item.id, 'completed')}
        >
          <Text style={styles.actionButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Management</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found.</Text>
        }
      />
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
  orderItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});

export default OrderManagementScreen;