import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPassword from './ForgotPassword';
import CompleteProfile from './CompleteProfile';
// import HomeScreen from './HomeScreen'; // Placeholder for the main screen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Splash Screen (First screen on app launch) */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Authentication Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />

        {/* Home Screen (Prevents going back after login/profile completion) */}
        {/* <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ gestureEnabled: false }} 
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
