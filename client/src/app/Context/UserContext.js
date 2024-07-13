'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Create a provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(null);

  // Load user from local storage when the component mounts
  useEffect(() => {
    
      const storedUser =  localStorage.getItem('currentUser');
      if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
      }
      setLoading(false); // Set loading to false after checking local storage
     
    
  }, []);

  const signIn = async (user) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate an API call for user login
      
       
       localStorage.setItem('currentUser', JSON.stringify(user)); // Save user to local storage
        setLoading(false);
        setCurrentUser(user);
   
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const signOut = async () => {
    setCurrentUser(null);
    await localStorage.removeItem('currentUser'); // Remove user from local storage
  };

  return (
    <UserContext.Provider
      value={{ currentUser, loading, error, signIn, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};