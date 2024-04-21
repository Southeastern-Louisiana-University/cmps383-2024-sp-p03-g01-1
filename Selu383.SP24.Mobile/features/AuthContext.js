import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (userData) => {
    // Logic to handle sign-up process and update user state
    setUser(userData);
  };

  const getUserType = (user) => {
    if (user && user.roles && user.roles.includes('Admin')) {
      return 'Admin';
    } else {
      return 'User';
    }
  };

  return (
    <AuthContext.Provider value={{ user, userType: getUserType(user), login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);