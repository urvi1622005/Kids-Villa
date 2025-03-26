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
  Animated,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const API_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api'
  : 'http://localhost:5000/api';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

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
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      if (error.response) errorMessage = error.response.data.message || errorMessage;
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const animateEntrance = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  };

  React.useEffect(() => {
    animateEntrance();
  }, []);

  return (
    <LinearGradient colors={['#0F172A', '#1E40AF']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View
            style={[
              styles.formContainer,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.heading}>Create Account</Text>

            <View style={styles.inputContainer}>
              <Icon name="person" size={22} color="#60A5FA" style={styles.icon} />
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="email" size={22} color="#60A5FA" style={styles.icon} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={22} color="#60A5FA" style={styles.icon} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setChecked(!checked)}
            >
              <Animated.View
                style={[
                  styles.checkbox,
                  { backgroundColor: checked ? '#60A5FA' : '#475569' },
                ]}
              >
                {checked && <Icon name="check" size={16} color="#F8FAFC" />}
              </Animated.View>
              <Text style={styles.checkboxText}>I agree to the terms and conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#3B82F6', '#1E40AF']}
                style={styles.buttonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#F8FAFC" />
                ) : (
                  <Text style={styles.signupButtonText}>Sign Up</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Login</Text>
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
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  formContainer: {
    width: '90%',
    maxWidth: 420,
    padding: 35,
    borderRadius: 25,
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 40,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(96, 165, 250, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#475569',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    paddingVertical: 14,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  checkboxText: {
    color: '#D1D5DB',
    fontSize: 15,
    flexShrink: 1,
  },
  signupButton: {
    borderRadius: 15,
    // overflow: 'hidden',
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loginText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  loginLink: {
    color: '#60A5FA',
    fontWeight: '600',
  },
});

export default SignupScreen;