// components/common/Tooltip.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleTooltip = () => setVisible(!visible);

  return (
    <View>
      <TouchableOpacity onPress={toggleTooltip}>
        {children}
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={toggleTooltip}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleTooltip}
        >
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>{text}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tooltipContainer: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%',
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Tooltip;