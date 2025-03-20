import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'http://localhost:5000/api/auth'; // Update with your backend URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sign Up
  const signUp = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/register`, { name, email, password });
      
      setUser(res.data.user); // Assuming backend returns { user: { id, name, email } }
      localStorage.setItem('token', res.data.token); // Save token
  
      toast.success('Account created successfully');
    } catch (error) {
      console.error(error.response?.data?.message || 'Signup failed');
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };
  

  // Sign In
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
