import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

// Pre-defined users (in production, this would come from a secure backend)
const USERS = [
  { username: 'admin1', password: 'admin123', fullName: 'Administrator One', role: 'admin' },
  { username: 'admin2', password: 'admin123', fullName: 'Administrator Two', role: 'admin' },
  { username: 'user1', password: 'user123', fullName: 'Data Entry User 1', role: 'user' },
  { username: 'user2', password: 'user123', fullName: 'Data Entry User 2', role: 'user' },
  { username: 'user3', password: 'user123', fullName: 'Data Entry User 3', role: 'user' },
  { username: 'user4', password: 'user123', fullName: 'Data Entry User 4', role: 'user' },
  { username: 'user5', password: 'user123', fullName: 'Data Entry User 5', role: 'user' },
  { username: 'user6', password: 'user123', fullName: 'Data Entry User 6', role: 'user' },
  { username: 'user7', password: 'user123', fullName: 'Data Entry User 7', role: 'user' },
  { username: 'user8', password: 'user123', fullName: 'Data Entry User 8', role: 'user' },
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (token) => {
    try {
      // Send token to backend for verification (in real app)
      // const response = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token })
      // });

      // For demo: Decode token and set user
      const decoded = jwt_decode(token);
      setCurrentUser({
        username: decoded.email,
        name: decoded.name,
        picture: decoded.picture
      });
      return true;
    } catch (error) {
      console.error("Google login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};