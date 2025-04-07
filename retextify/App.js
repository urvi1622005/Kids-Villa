import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./components/AuthContext";

// Import Screens
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import ForgotPassword from "./components/ForgotPassword";
import OCRScreen from "./components/OCRScreen";
import HomeScreen from "./components/HomeScreen";
import AIChatScreen from "./components/AIChatScreen";
import TemplateChooser from "./components/TemplateChooser";
import DocumentScanner from "./components/DocumentScanner";
import Settings from "./components/Settings";

const Stack = createNativeStackNavigator();

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
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="OCRScreen" component={OCRScreen} />
            <Stack.Screen name="AIChat" component={AIChatScreen} />
            <Stack.Screen name="DocumentScanner" component={DocumentScanner} />
            <Stack.Screen name="TemplateChooser" component={TemplateChooser} />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        ) : (
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
