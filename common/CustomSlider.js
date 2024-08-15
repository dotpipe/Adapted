// components/common/Slider.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const CustomSlider = ({ value, onValueChange, minimumValue = 0, maximumValue = 100, step = 1, label }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#007AFF"
      />
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  value: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CustomSlider;