'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create a context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Create a provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  
  useEffect(() => {
    
      const storedUser =  localStorage.getItem('currentUser');
      if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
      }
    
  }, []);

  const signIn = async (user) => {
   
    try {

       localStorage.setItem('currentUser', JSON.stringify(user)); 
        setCurrentUser(user);
   
    } catch (error) {
      toast.error(error)
    }
  };

  const signOut = async () => {
    setCurrentUser(null);
    await localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider
      value={{ currentUser,signIn, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};