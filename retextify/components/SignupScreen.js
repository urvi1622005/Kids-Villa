import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign Up</Text>
      <TextInput placeholder="Name" style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TextInput placeholder="Email" style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
