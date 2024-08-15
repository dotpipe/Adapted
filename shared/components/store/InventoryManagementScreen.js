// components/store/InventoryManagementScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { database } from '../../firebaseConfig';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const InventoryManagementScreen = ({ storeId }) => {
  const [inventory, setInventory] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

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

  const addInventoryItem = async () => {
    if (newItemName && newItemQuantity && newItemPrice) {
      await addDoc(collection(database, 'inventory'), {
        name: newItemName,
        quantity: parseInt(newItemQuantity),
        price: parseFloat(newItemPrice),
        storeId: storeId
      });
      setNewItemName('');
      setNewItemQuantity('');
      setNewItemPrice('');
      fetchInventory();
    }
  };

  const updateInventoryItem = async (itemId, newQuantity) => {
    const itemRef = doc(database, 'inventory', itemId);
    await updateDoc(itemRef, { quantity: parseInt(newQuantity) });
    fetchInventory();
  };

  const renderInventoryItem = ({ item }) => (
    <View style={styles.inventoryItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateInventoryItem(item.id, item.quantity - 1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateInventoryItem(item.id, item.quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Management</Text>
      <View style={styles.addItemForm}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={newItemQuantity}
          onChangeText={setNewItemQuantity}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={newItemPrice}
          onChangeText={setNewItemPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addInventoryItem}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={inventory}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No inventory items found.</Text>
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
  addItemForm: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inventoryItem: {
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
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});

export default InventoryManagementScreen;