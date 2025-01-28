import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const ForgotPassword = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Forgot Password?</Text>
      <TextInput placeholder="Enter your email" style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;