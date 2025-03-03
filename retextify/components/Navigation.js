import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DocumentScanner from './DocumentScanner'; // Import Document Scanner Screen
import OCRScreen from './OCRScreen'; // Import OCR Screen
// import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignupScreen';
// import SplashScreen from './SplashScreen';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Document Scanner Screen */}
        {/* <Stack.Screen name="DocumentScanner" component={DocumentScanner} /> */}

        {/* OCR Screen */}
        <Stack.Screen name="loginScreen" component={LoginScreen} />
         <Stack.Screen name="SignUpScreen" component={SignUpScreen} />   
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen name="OCRScreen" component={OCRScreen} />
        <Stack.Screen name="DocumentScanner" component={DocumentScanner}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
