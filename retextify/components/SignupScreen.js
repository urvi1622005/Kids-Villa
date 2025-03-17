import React, { useState } from 'react';
import { 
  Alert, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Animated
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';  // Import Auth Context
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const API_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000/api'  // Android Emulator
  : 'http://localhost:5000/api'; // iOS & Metro Bundler

const SignupScreen = () => {

  const { setIsAuthenticated } = useAuth();  // Get authentication setter
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!checked) {
      Alert.alert('Error', 'Please agree to the terms and conditions.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`/register`, { name, email, password });
      Alert.alert('Success', 'Signup successful! Redirecting...');
      navigation.navigate('OCRScreen');
      // Navigate to OCRScreen

    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    fadeIn();
  }, []);

  return (
    <LinearGradient
      colors={['#1A1A1A', '#121212']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
            <Text style={styles.heading}>Create Account</Text>
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor="#bbb"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#bbb"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#FF5722" style={styles.icon} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#bbb"
              />
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setChecked(!checked)} style={styles.checkbox}>
                {checked ? (
                  <Icon name="check-box" size={24} color="#FF5722" />
                ) : (
                  <Icon name="check-box-outline-blank" size={24} color="#bbb" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>I agree to the terms and conditions</Text>
            </View>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signupButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={{ color: '#FF5722' }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    width: '100%', // Ensure it takes full width
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    alignSelf: 'flex-start',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    color: '#bbb',
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
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
    textAlign: 'center',
  },
});

export default SignupScreen;

