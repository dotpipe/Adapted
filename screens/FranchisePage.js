// src/screens/FranchisePage.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getFranchiseData } from '../services/FranchiseService';

const FranchisePage = () => {
  const [franchiseData, setFranchiseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFranchiseData();
      setFranchiseData(data);
    };
    fetchData();
  }, []);

  if (!franchiseData) {
    return <Text>Loading franchise data...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Franchise Overview</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statItem}>Total Stores: {franchiseData.totalStores}</Text>
        <Text style={styles.statItem}>Total Revenue: ${franchiseData.totalRevenue.toFixed(2)}</Text>
        <Text style={styles.statItem}>Average Store Performance: {franchiseData.avgStorePerformance}%</Text>
      </View>

      <Text style={styles.sectionTitle}>Revenue Trend</Text>
      <LineChart
        data={franchiseData.revenueTrend}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={styles.chart}
      />

      <Text style={styles.sectionTitle}>Top Performing Stores</Text>
      {franchiseData.topStores.map((store, index) => (
        <TouchableOpacity key={index} style={styles.storeItem}>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text>Revenue: ${store.revenue.toFixed(2)}</Text>
          <Text>Performance: {store.performance}%</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Detailed Reports</Text>
      </TouchableOpacity>
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
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  statItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  storeItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FranchisePage;