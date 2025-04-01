import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const [auth, userData] = await Promise.all([
          AsyncStorage.getItem("isAuthenticated"),
          AsyncStorage.getItem("user"),
        ]);
        if (auth === "true" && userData) {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Load auth failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const saveAuth = async () => {
      try {
        await Promise.all(
          isAuthenticated && user
            ? [
                AsyncStorage.setItem("isAuthenticated", "true"),
                AsyncStorage.setItem("user", JSON.stringify(user)),
              ]
            : [
                AsyncStorage.removeItem("isAuthenticated"),
                AsyncStorage.removeItem("user"),
              ]
        );
      } catch (error) {
        console.error("Save auth failed:", error);
      }
    };
    saveAuth();
  }, [isAuthenticated, user, isLoading]);

  const login = (userData) => {
    if (!userData) return console.error("No user data");
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isLoading) return null; // Or <Text>Loading...</Text>

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth requires AuthProvider");
  return context;
};