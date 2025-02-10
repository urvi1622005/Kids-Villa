import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DocumentScanner from './DocumentScanner'; // Import Document Scanner Screen
import OCRScreen from './OCRScreen'; // Import OCR Screen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Document Scanner Screen */}
        {/* <Stack.Screen name="DocumentScanner" component={DocumentScanner} /> */}

        {/* OCR Screen */}
        <Stack.Screen name="OCRScreen" component={OCRScreen} />
        <Stack.Screen name="DocumentScanner" component={DocumentScanner}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
