import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CompleteProfile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const navigation = useNavigation();

  const handleFinish = () => {
    if (!name || !phone || !college) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    Alert.alert("Success", "Profile completed!");
    navigation.replace('Home'); // Navigate to Home Screen
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <TextInput 
          placeholder="Full Name" 
          placeholderTextColor="#bbb"
          style={styles.input} 
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <TextInput 
          placeholder="Phone Number" 
          placeholderTextColor="#bbb"
          style={styles.input} 
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput 
          placeholder="College / University" 
          placeholderTextColor="#bbb"
          style={styles.input} 
          value={college}
          onChangeText={setCollege}
          autoCapitalize="words"
        />

        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 20,
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
});

export default CompleteProfile;
