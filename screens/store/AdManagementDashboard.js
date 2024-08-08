// screens/AdManagementDashboard.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const AdCard = ({ ad }) => (
  <View style={styles.adCard}>
    <Text style={styles.adTitle}>{ad.title}</Text>
    <Text style={styles.adDescription}>{ad.description}</Text>
    <View style={styles.adActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Text>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const AdManagementDashboard = () => {
  const ads = []; // Fetch ads from AdManager

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ad Management Dashboard</Text>
      <FlatList
        data={ads}
        renderItem={({ item }) => <AdCard ad={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  adCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adDescription: {
    marginTop: 5,
  },
  adActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
});

export default AdManagementDashboard;