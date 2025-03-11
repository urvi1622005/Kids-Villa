import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./components/AuthContext";

// Import Screens
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import ForgotPassword from "./components/ForgotPassword";
import OCRScreen from "./components/OCRScreen";
import HomeScreen from "./components/HomeScreen";
import AIChatScreen from "./components/AIChatScreen"; // ✅ AI Chat Screen

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { isAuthenticated } = useAuth(); // Use the context
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF5722" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Show authentication screens if the user is NOT authenticated
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="OCRScreen" component={OCRScreen} />
            <Stack.Screen name="AIChat" component={AIChatScreen} />
          </>
        ) : (
          // Show app screens if the user is authenticated
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="OCRScreen" component={OCRScreen} />
            <Stack.Screen name="AIChat" component={AIChatScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
};

export default App;