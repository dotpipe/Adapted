// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { APIKeeper } from '../services/api_keeper';
import { HeatMapViews } from '../components/HeatMapViews';
import { HeatMapGenerator } from '../services/heatmap_generator';

const HomeScreen = ({ userType }) => {
  const navigation = useNavigation();
  const [apiStatus, setApiStatus] = useState({});
  const apiKeeper = new APIKeeper('https://your-server.com');
  const heatMapGenerator = new HeatMapGenerator(100, 100);

  useEffect(() => {
    const fetchApiStatus = async () => {
      await apiKeeper.fetch_api_keys();
      setApiStatus({
        maps: apiKeeper.verify_hash('maps', 'expected_hash'),
        crime: apiKeeper.verify_hash('crime', 'expected_hash'),
        server: apiKeeper.verify_hash('server', 'expected_hash'),
      });
    };
    fetchApiStatus();
  }, []);

  const renderButton = (title, route) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(route)}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AdaptMobile Dashboard</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {renderButton('Route Optimizer', 'RouteOptimizer')}
        {renderButton('Store Analytics', 'StoreAnalytics')}
        {renderButton('Franchise Management', 'FranchisePage')}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heat Map Visualization</Text>
        <HeatMapViews heatMapGenerator={heatMapGenerator} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Key Status</Text>
        {Object.entries(apiStatus).map(([key, status]) => (
          <Text key={key} style={styles.apiStatus}>
            {key.toUpperCase()}: {status ? '✅' : '❌'}
          </Text>
        ))}
      </View>

      {userType === 'store' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Management</Text>
          {renderButton('Inventory Management', 'InventoryManagement')}
          {renderButton('Customer Insights', 'CustomerInsights')}
          {renderButton('Ad Manager', 'AdManager')}
        </View>
      )}

      {userType === 'customer' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shopping</Text>
          {renderButton('Product Search', 'ProductSearch')}
          {renderButton('My Cart', 'Cart')}
          {renderButton('Order History', 'OrderHistory')}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  apiStatus: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default HomeScreen;