import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const OwnerAuthContext = createContext();

export const OwnerAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Login using backend API
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/owner/login`, {
        email,
        password,
      });

      if (res.data.success) {
        // Save JWT in localStorage
        localStorage.setItem("ownerToken", res.data.token);

        // Save owner info in state
        setUser(res.data.owner);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: res.data.error };
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("ownerToken");
    setUser(null);
  };

  // Check for token on initial load
  React.useEffect(() => {
    const token = localStorage.getItem("ownerToken");
    if (token) {
      // Optionally, verify token with backend
      axios
        .get(`${backendUrl}/api/owner/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.owner);
        })
        .catch(() => {
          localStorage.removeItem("ownerToken");
        });
    }
  }, []);

  return (
    <OwnerAuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </OwnerAuthContext.Provider>
  );
};

// Optional hook
export const useOwnerAuth = () => useContext(OwnerAuthContext);
