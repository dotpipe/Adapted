// components/OccupancyIndicator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OccupancyIndicator = ({ occupancy }) => {
  let color = '#4CAF50'; // Green for low occupancy
  if (occupancy > 70) {
    color = '#F44336'; // Red for high occupancy
  } else if (occupancy > 40) {
    color = '#FFC107'; // Yellow for medium occupancy
  }

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: color }]} />
      <Text style={styles.text}>{occupancy}% Occupied</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default OccupancyIndicator;