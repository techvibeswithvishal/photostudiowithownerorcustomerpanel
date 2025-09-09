import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, getIdTokenResult } from "firebase/auth";

export const SchoolAuthContext = createContext();

export const SchoolAuthProvider = ({ children }) => {
  const [schoolUser, setSchoolUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdTokenResult(user);
        if (token.claims.role === "school") {
          setSchoolUser(user); // ✅ set correctly
        } else {
          await signOut(auth);
          setSchoolUser(null);
        }
      } else {
        setSchoolUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  // Refresh token to get claims immediately
  await userCredential.user.getIdToken(true);

  const token = await getIdTokenResult(userCredential.user);
  if (token.claims.role !== "school") {
    await signOut(auth);
    throw new Error("This account is not a school account.");
  }
  setSchoolUser(userCredential.user);
};


  const logout = async () => {
    await signOut(auth);
    setSchoolUser(null);
  };

  return (
    <SchoolAuthContext.Provider value={{ schoolUser, login, logout, loading }}>
      {children}
    </SchoolAuthContext.Provider>
  );
};
