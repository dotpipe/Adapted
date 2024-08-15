// components/common/Avatar.js

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Avatar = ({ source, size = 50, style }) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={typeof source === 'string' ? { uri: source } : source}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Avatar;