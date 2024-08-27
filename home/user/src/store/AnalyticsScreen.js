// components/store/AnalyticsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import StoreHeatMapService from '../services/StoreHeatMapService';

const AnalyticsScreen = ({ storeId }) => {
  const [salesData, setSalesData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
  });
  const [heatMapData, setHeatMapData] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    // Fetch sales data (replace with actual API call)
    const salesResponse = await fetch(`/api/store/${storeId}/sales`);
    const salesData = await salesResponse.json();
    setSalesData(salesData);

    // Fetch heat map data
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const heatMapData = StoreHeatMapService.generateHeatMap(storeId, weekAgo, now);
    setHeatMapData(heatMapData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Store Analytics</Text>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Sales</Text>
        <LineChart
          data={salesData}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
        />
      </View>

      <View style={styles.heatMapContainer}>
        <Text style={styles.chartTitle}>Customer Heat Map</Text>
        {/* Implement heat map visualization here */}
        <Text>Heat map data points: {heatMapData.length}</Text>
      </View>
    </ScrollView>
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
  chartContainer: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heatMapContainer: {
    marginBottom: 30,
  },
});

export default AnalyticsScreen;