import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../components/AuthContext';

import { useAuth } from '../components/AuthContext';

// Import Screens
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ForgotPassword from './components/ForgotPassword';
import OCRScreen from './components/OCRScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { isAuthenticated } = useAuth(); // Use Auth Context
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an authentication check (e.g., AsyncStorage or API call)
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF5722" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Authentication Screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : (
          // Main App Screens (After Login)
          <>
            <Stack.Screen name="OCRScreen" component={OCRScreen} />
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
