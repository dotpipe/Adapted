// components/common/Rating.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Rating = ({ rating, size = 20, color = '#FFD700' }) => {
  const filledStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = 5 - filledStars - (partialStar > 0 ? 1 : 0);

  return (
    <View style={styles.container}>
      {[...Array(filledStars)].map((_, i) => (
        <Icon key={`filled-${i}`} name="star" size={size} color={color} />
      ))}
      {partialStar > 0 && (
        <Icon name="star-half" size={size} color={color} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon key={`empty-${i}`} name="star-outline" size={size} color={color} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Rating;