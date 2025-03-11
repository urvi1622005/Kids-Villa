import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  // Update localStorage when authentication state changes
  useEffect(() => {
    try {
      localStorage.setItem("isAuthenticated", isAuthenticated);
    } catch (error) {
      console.error("Failed to update localStorage:", error);
    }
  }, [isAuthenticated]);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.error("Failed to remove item from localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};