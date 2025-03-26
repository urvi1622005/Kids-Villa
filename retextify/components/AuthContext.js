import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Check initial authentication state from AsyncStorage on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem("isAuthenticated");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedAuth === "true" && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setIsAuthenticated(true);
            setUser(parsedUser);
          } catch (parseError) {
            console.error("Failed to parse stored user:", parseError);
            await AsyncStorage.removeItem("user"); // Clean up invalid data
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Failed to load authentication state:", error);
      } finally {
        setIsLoading(false); // Done loading, whether successful or not
      }
    };

    checkAuthentication();
  }, []);

  // Persist authentication state to AsyncStorage when it changes
  useEffect(() => {
    const updateStorage = async () => {
      try {
        if (isAuthenticated && user) {
          await AsyncStorage.setItem("isAuthenticated", "true");
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
          await Promise.all([
            AsyncStorage.removeItem("isAuthenticated"),
            AsyncStorage.removeItem("user"),
          ]);
        }
      } catch (error) {
        console.error("Failed to update AsyncStorage:", error);
      }
    };

    if (!isLoading) {
      // Only update storage after initial load is complete
      updateStorage();
    }
  }, [isAuthenticated, user, isLoading]);

  const login = (userData) => {
    if (!userData) {
      console.error("Login failed: No user data provided");
      return;
    }
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
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