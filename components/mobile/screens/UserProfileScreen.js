// /components/mobile/screens/UserProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getCurrentUser, signOut } from '../services/AuthService';

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>User Profile</Text>
      {user && (
        <>
          <Text>Email: {user.email}</Text>
          <Text>User ID: {user.uid}</Text>
        </>
      )}
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default UserProfileScreen;