import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://localhost:5000/api/auth';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      
      const { data } = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password
      });

      // Store token and user data
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data));

      // Navigate to main app screen
      navigation.navigate('Home');

    } catch (error) {
      let errorMessage = 'Signup failed';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.signupButtonText}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={{ color: '#FF5722' }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark theme background
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  signupBox: {
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
  signupButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 15,
  },
});

export default SignupScreen;
