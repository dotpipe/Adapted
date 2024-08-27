// components/store/StoreSettingsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import { database } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const StoreSettingsScreen = ({ storeId }) => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    fetchStoreSettings();
  }, []);

  const fetchStoreSettings = async () => {
    const storeRef = doc(database, 'stores', storeId);
    const storeSnap = await getDoc(storeRef);
    if (storeSnap.exists()) {
      const data = storeSnap.data();
      setStoreName(data.name);
      setStoreAddress(data.address);
      setStorePhone(data.phone);
      setNotificationsEnabled(data.notificationsEnabled);
    }
  };

  const saveSettings = async () => {
    const storeRef = doc(database, 'stores', storeId);
    await updateDoc(storeRef, {
      name: storeName,
      address: storeAddress,
      phone: storePhone,
      notificationsEnabled: notificationsEnabled
    });
    alert('Settings saved successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Store Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        value={storeName}
        onChangeText={setStoreName}
      />
      <TextInput
        style={styles.input}
        placeholder="Store Address"
        value={storeAddress}
        onChangeText={setStoreAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Store Phone"
        value={storePhone}
        onChangeText={setStorePhone}
        keyboardType="phone-pad"
      />
      <View style={styles.switchContainer}>
        <Text>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StoreSettingsScreen;