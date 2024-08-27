// /components/web/pages/UserProfile.js
import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from '../../services/AuthService';

function UserProfile({ history }) {
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
    history.push('/login');
  };
  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <>
          <p>Email: {user.email}</p>
          <p>User ID: {user.uid}</p>
        </>
      )}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default UserProfile;