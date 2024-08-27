// components/consumer/AdDetailScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AdManager from '../services/AdManager';

const AdDetailScreen = ({ route, navigation }) => {
  const { adId } = route.params;
  const [ad, setAd] = useState(null);

  useEffect(() => {
    fetchAdDetails();
  }, []);

  const fetchAdDetails = async () => {
    try {
      const adData = await AdManager.getAdById(adId);
      setAd(adData);
    } catch (error) {
      console.error('Error fetching ad details:', error);
    }
  };

  if (!ad) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: ad.imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{ad.title}</Text>
        <Text style={styles.price}>${ad.price}</Text>
        <Text style={styles.description}>{ad.description}</Text>
        <Text style={styles.store}>Available at: {ad.storeName}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Handle reservation */}}>
          <Text style={styles.buttonText}>Reserve Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  store: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdDetailScreen;
