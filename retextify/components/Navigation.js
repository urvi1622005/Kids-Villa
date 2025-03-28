import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/AuthContext'; // Example: Auth context for managing authentication state

// Import all screens
import DocumentScanner from './screens/DocumentScanner';
import OCRScreen from './screens/OCRScreen';
import Settings from './Settings';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';
import AIChatScreen from './screens/AIChatScreen';
import SplashScreen from './screens/SplashScreen'; 

// Create stack navigators
const Stack = createStackNavigator();

// Main Navigator (for authenticated users)
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DocumentScanner" component={DocumentScanner} />
      <Stack.Screen name="OCRScreen" component={OCRScreen} />
      <Stack.Screen name="AIChatScreen" component={AIChatScreen} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

// Auth Navigator (for unauthenticated users)
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

// App Navigator (conditionally renders MainNavigator or AuthNavigator)
const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication state from context

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;