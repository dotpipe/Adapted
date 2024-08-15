// components/common/ProgressBar.js

import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, color = '#007AFF', height = 10 }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View 
        style={[
          styles.bar, 
          { 
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
            backgroundColor: color
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  },
});

export default ProgressBar;