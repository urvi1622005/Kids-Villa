import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <Image source={require('../assets/icon.png')} style={styles.logo} />

      {/* Login Box */}
      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>

        <TextInput placeholder="Email" placeholderTextColor="#bbb" style={styles.input} />
        <TextInput placeholder="Password" placeholderTextColor="#bbb" secureTextEntry style={styles.input} />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={{ color: '#FF5722' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background
    padding: 20,
  },
  logo: {
    width: 100, 
    height: 100, 
    marginBottom: 20,
  },
  loginBox: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1E1E1E', // Slightly lighter box
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#2A2A2A',
    color: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  forgotText: {
    color: '#FF5722',
    fontSize: 14,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 15,
  },
});

export default LoginScreen;
