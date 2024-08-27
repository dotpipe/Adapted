// components/store/EmployeeManagementScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { database } from '../../firebaseConfig';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const EmployeeManagementScreen = ({ storeId }) => {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeRole, setNewEmployeeRole] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const employeesRef = collection(database, 'employees');
    const q = query(employeesRef, where('storeId', '==', storeId));
    const querySnapshot = await getDocs(q);
    const employeeData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEmployees(employeeData);
  };

  const addEmployee = async () => {
    if (newEmployeeName && newEmployeeRole) {
      await addDoc(collection(database, 'employees'), {
        name: newEmployeeName,
        role: newEmployeeRole,
        storeId: storeId
      });
      setNewEmployeeName('');
      setNewEmployeeRole('');
      fetchEmployees();
    }
  };

  const removeEmployee = async (employeeId) => {
    await deleteDoc(doc(database, 'employees', employeeId));
    fetchEmployees();
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text style={styles.employeeName}>{item.name}</Text>
      <Text style={styles.employeeRole}>{item.role}</Text>
      <TouchableOpacity onPress={() => removeEmployee(item.id)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Management</Text>
      <View style={styles.addEmployeeForm}>
        <TextInput
          style={styles.input}
          placeholder="Employee Name"
          value={newEmployeeName}
          onChangeText={setNewEmployeeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Employee Role"
          value={newEmployeeRole}
          onChangeText={setNewEmployeeRole}
        />
        <TouchableOpacity style={styles.addButton} onPress={addEmployee}>
          <Text style={styles.addButtonText}>Add Employee</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={employees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No employees found.</Text>
        }
      />
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
  addEmployeeForm: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  employeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  employeeRole: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});

export default EmployeeManagementScreen;