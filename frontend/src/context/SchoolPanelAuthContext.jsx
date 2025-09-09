import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SchoolAuthContext = createContext();

export const SchoolAuthProvider = ({ children }) => {
  const [schoolUser, setSchoolUser] = useState(
    JSON.parse(localStorage.getItem("schoolUser")) || null
  );
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // from .env

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/school/login`, { email, password });
      
      // Backend should return { token, school }
      const { token, school } = res.data;

      // Save token + user info in localStorage
      localStorage.setItem("schoolToken", token);
      localStorage.setItem("schoolUser", JSON.stringify(school));

      setSchoolUser(school);
      setLoading(false);
      return school;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("schoolToken");
    localStorage.removeItem("schoolUser");
    setSchoolUser(null);
  };

  return (
    <SchoolAuthContext.Provider value={{ schoolUser, login, logout, loading }}>
      {children}
    </SchoolAuthContext.Provider>
  );
};
