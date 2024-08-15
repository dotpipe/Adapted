// components/common/ErrorMessage.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffcccb',
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    color: '#d8000c',
    textAlign: 'center',
  },
});

export default ErrorMessage;