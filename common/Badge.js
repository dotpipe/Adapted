// components/common/Badge.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ text, color = '#007AFF', textColor = '#FFFFFF' }) => {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;