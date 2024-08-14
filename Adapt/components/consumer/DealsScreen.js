// components/consumer/DealsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AdManager from '../../services/AdManager';
import LocationService from '../../services/LocationService';

const DealsScreen = ({ navigation }) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const zipCode = await LocationService.getZipCode();
      const dealsData = await AdManager.loadAds(zipCode);
      setDeals(dealsData);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const renderDealItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dealItem}
      onPress={() => navigation.navigate('AdDetail', { adId: item.id })}
    >
      <Text style={styles.dealTitle}>{item.title}</Text>
      <Text style={styles.dealDescription}>{item.description}</Text>
      <Text style={styles.dealPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Deals</Text>
      <FlatList
        data={deals}
        renderItem={renderDealItem}
        keyExtractor={(item) => item.id}
        refreshing={false}
        onRefresh={fetchDeals}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dealItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dealDescription: {
    fontSize: 14,
    color: '#666',
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 5,
  },
});

export default DealsScreen;