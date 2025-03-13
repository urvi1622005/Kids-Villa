import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Add user state to store user data

  // Check initial authentication state from AsyncStorage
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem("isAuthenticated");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedAuth === "true" && storedUser) {
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser)); // Parse stored user data
        }
      } catch (error) {
        console.error("Failed to load authentication state:", error);
      }
    };

    checkAuthentication();
  }, []);

  // Update AsyncStorage when authentication state changes
  useEffect(() => {
    const updateStorage = async () => {
      try {
        await AsyncStorage.setItem("isAuthenticated", isAuthenticated.toString());
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Failed to update AsyncStorage:", error);
      }
    };

    updateStorage();
  }, [isAuthenticated, user]);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Store user data
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data
    try {
      AsyncStorage.removeItem("isAuthenticated");
      AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Failed to clear AsyncStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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