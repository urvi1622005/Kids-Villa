import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;