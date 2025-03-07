import React, { useState, useEffect } from 'react';
import { Alert, Animated, Easing, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const API_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000/api'  // Android Emulator
  : 'http://localhost:5000/api'; 

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const shakeAnimation = new Animated.Value(0);
  const inputScale = new Animated.Value(1);

  useEffect(() => {
    if (error) {
      shakeForm();
    }
  }, [error]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      navigation.navigate('HomeScreen');
    } catch (error) {
      let errorMessage = 'Login failed';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const shakeForm = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const animateInput = () => {
    Animated.sequence([
      Animated.timing(inputScale, { toValue: 1.05, duration: 100, useNativeDriver: true }),
      Animated.timing(inputScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <LinearGradient colors={['#121212', '#1E1E1E']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />

        <Animated.View
          style={[
            styles.loginBox,
            { transform: [{ translateX: shakeAnimation }] },
          ]}
        >
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          {error && (
            <Animated.View style={styles.errorContainer}>
              <Ionicons name="warning" size={20} color="#FF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </Animated.View>
          )}

          <Animated.View style={{ transform: [{ scale: inputScale }] }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#bbb"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={animateInput}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: inputScale }] }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#bbb"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              onFocus={animateInput}
            />
          </Animated.View>

          <View style={styles.rememberMeContainer}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
              <MaterialIcons
                name={rememberMe ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color={rememberMe ? '#FF5722' : '#bbb'}
              />
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={['#FF5722', '#FF9800']}
              style={styles.gradientButton}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="#DB4437" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#4267B2" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={24} color="white" />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>
              Don't have an account? <Text style={{ color: '#FF5722' }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    marginBottom: 20,
    borderRadius: 15,
  },
  loginBox: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: '#2A2A2A',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Roboto-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 20,
    fontFamily: 'Roboto-Regular',
  },
  input: {
    width: '100%',
    backgroundColor: '#3A3A3A',
    color: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  rememberMeText: {
    color: '#bbb',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
  },
  forgotText: {
    color: '#FF5722',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Roboto-Regular',
  },
  loginButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  dividerText: {
    color: '#bbb',
    fontSize: 14,
    marginHorizontal: 10,
    fontFamily: 'Roboto-Regular',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3A3A',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
  },
  signupText: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 15,
    fontFamily: 'Roboto-Regular',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'Roboto-Regular',
  },
});

export default LoginScreen;