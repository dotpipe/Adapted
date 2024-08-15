// components/common/Checkbox.js

import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Checkbox = ({ checked, onPress, size = 24, color = '#007AFF' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.checkbox, { width: size, height: size, borderColor: color }]}>
        {checked && (
          <Icon name="checkmark" size={size - 4} color={color} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkbox;