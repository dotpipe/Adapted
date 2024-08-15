// components/common/Tag.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tag = ({ text, color = '#007AFF', textColor = '#FFFFFF', style }) => {
  return (
    <View style={[styles.tag, { backgroundColor: color }, style]}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Tag;