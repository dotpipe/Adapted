// components/common/Stepper.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stepper = ({ value, onIncrement, onDecrement, minValue = 0, maxValue = Infinity }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onDecrement}
        disabled={value <= minValue}
        style={[styles.button, value <= minValue && styles.disabledButton]}
      >
        <Icon name="remove" size={24} color={value <= minValue ? '#ccc' : '#007AFF'} />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity
        onPress={onIncrement}
        disabled={value >= maxValue}
        style={[styles.button, value >= maxValue && styles.disabledButton]}
      >
        <Icon name="add" size={24} color={value >= maxValue ? '#ccc' : '#007AFF'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
});

export default Stepper;