// components/store/FireSaleScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { database } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const FireSaleScreen = ({ storeId }) => {
  const [fireSales, setFireSales] = useState([]);
  const [newSaleItem, setNewSaleItem] = useState('');
  const [newSalePrice, setNewSalePrice] = useState('');

  useEffect(() => {
    fetchFireSales();
  }, []);

  const fetchFireSales = async () => {
    const fireSalesRef = collection(database, 'fireSales');
    const q = query(fireSalesRef, where('storeId', '==', storeId));
    const querySnapshot = await getDocs(q);
    const fireSalesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFireSales(fireSalesData);
  };

  const addFireSale = async () => {
    if (newSaleItem && newSalePrice) {
      const fireSalesRef = collection(database, 'fireSales');
      await addDoc(fireSalesRef, {
        storeId,
        item: newSaleItem,
        price: parseFloat(newSalePrice),
        createdAt: new Date()
      });
      setNewSaleItem('');
      setNewSalePrice('');
      fetchFireSales();
    }
  };

  const removeFireSale = async (saleId) => {
    await deleteDoc(doc(database, 'fireSales', saleId));
    fetchFireSales();
  };

  const renderFireSaleItem = ({ item }) => (
    <View style={styles.saleItem}>
      <Text style={styles.saleItemText}>{item.item} - ${item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => removeFireSale(item.id)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fire Sales</Text>
      <View style={styles.addSaleContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item name"
          value={newSaleItem}
          onChangeText={setNewSaleItem}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={newSalePrice}
          onChangeText={setNewSalePrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addFireSale}>
          <Text style={styles.addButtonText}>Add Fire Sale</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={fireSales}
        renderItem={renderFireSaleItem}
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
  addSaleContainer: {
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
  saleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  saleItemText: {
    fontSize: 16,
  },
  removeButton: {
    color: 'red',
  },
});

export default FireSaleScreen;