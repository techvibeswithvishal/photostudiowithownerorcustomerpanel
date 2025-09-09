// src/context/OwnerAuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// ✅ Named export for context
export const OwnerAuthContext = createContext();

// ✅ Named export for provider
export const OwnerAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    // Refresh token to get custom claims immediately
    await res.user.getIdToken(true);

    setUser(res.user);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};


  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <OwnerAuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </OwnerAuthContext.Provider>
  );
};

// ✅ Optional hook
export const useOwnerAuth = () => useContext(OwnerAuthContext);
