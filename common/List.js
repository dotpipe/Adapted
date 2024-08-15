// components/common/List.js

import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

const List = ({ data, renderItem, keyExtractor, style }) => {
  return (
    <FlatList
      style={[styles.list, style]}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default List;