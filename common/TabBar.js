// components/common/TabBar.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TabBar = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            activeTab === index && styles.activeTab
          ]}
          onPress={() => onTabPress(index)}
        >
          <Text style={[
            styles.tabText,
            activeTab === index && styles.activeTabText
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default TabBar;