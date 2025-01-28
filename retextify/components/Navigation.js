import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPassword from './ForgotPassword';
import CompleteProfile from './CompleteProfile';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;