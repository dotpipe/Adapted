// components/common/Switch.js

import React from 'react';
import { Switch as RNSwitch, StyleSheet } from 'react-native';

const Switch = ({ value, onValueChange, trackColor = { false: "#767577", true: "#81b0ff" }, thumbColor = value ? "#f5dd4b" : "#f4f3f4" }) => {
  return (
    <RNSwitch
      trackColor={trackColor}
      thumbColor={thumbColor}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
      style={styles.switch}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});

export default Switch;