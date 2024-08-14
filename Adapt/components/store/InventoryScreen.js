// components/store/InventoryScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { database } from '../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const InventoryScreen = ({ storeId }) => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const inventoryRef = collection(database, 'inventory');
    const q = query(inventoryRef, where('storeId', '==', storeId));
    const querySnapshot = await getDocs(q);
    const inventoryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInventory(inventoryData);
  };

  const updateItemQuantity = async (itemId, newQuantity) => {
    const itemRef = doc(database, 'inventory', itemId);
    await updateDoc(itemRef, { quantity: newQuantity });
    fetchInventory(); // Refresh inventory after update
  };

  const renderInventoryItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      <View style={styles.quantityControls}>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity - 1)}>
          <Text style={styles.controlButton}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity + 1)}>
          <Text style={styles.controlButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Management</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search inventory..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredInventory}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
  },
  controlButton: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default InventoryScreen;