import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }
    Alert.alert("Success", "A password reset link has been sent to your email.");
    navigation.goBack(); // Navigate back to login screen
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Enter your registered email to reset your password.</Text>
      
      <TextInput 
        placeholder="Enter your email" 
        placeholderTextColor="#bbb"
        style={styles.input} 
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#1E1E1E',
    color: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    color: '#FF5722',
    fontSize: 14,
    marginTop: 15,
  },
});

export default ForgotPassword;
