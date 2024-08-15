// components/store/StoreAnalyticsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { database } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const StoreAnalyticsScreen = ({ storeId }) => {
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [customerData, setCustomerData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    // Fetch sales data
    const salesRef = collection(database, 'sales');
    const salesQuery = query(salesRef, where('storeId', '==', storeId));
    const salesSnapshot = await getDocs(salesQuery);
    const salesByDate = {};
    salesSnapshot.forEach(doc => {
      const date = doc.data().date.toDate().toLocaleDateString();
      salesByDate[date] = (salesByDate[date] || 0) + doc.data().amount;
    });
    const sortedSalesDates = Object.keys(salesByDate).sort();
    setSalesData({
      labels: sortedSalesDates,
      datasets: [{ data: sortedSalesDates.map(date => salesByDate[date]) }]
    });

    // Fetch customer data
    const customersRef = collection(database, 'customers');
    const customersQuery = query(customersRef, where('storeId', '==', storeId));
    const customersSnapshot = await getDocs(customersQuery);
    const customersByAge = {};
    customersSnapshot.forEach(doc => {
      const age = doc.data().age;
      const ageGroup = Math.floor(age / 10) * 10;
      customersByAge[ageGroup] = (customersByAge[ageGroup] || 0) + 1;
    });
    const sortedAgeGroups = Object.keys(customersByAge).sort((a, b) => a - b);
    setCustomerData({
      labels: sortedAgeGroups.map(age => `${age}-${parseInt(age) + 9}`),
      datasets: [{ data: sortedAgeGroups.map(age => customersByAge[age]) }]
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Store Analytics</Text>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Sales Over Time</Text>
        <LineChart
          data={salesData}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Customer Age Distribution</Text>
        <BarChart
          data={customerData}
          width={350}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
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
});

export default StoreAnalyticsScreen;