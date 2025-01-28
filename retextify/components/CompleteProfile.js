import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const CompleteProfile = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Complete Profile</Text>
      <TextInput placeholder="Name" style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TextInput placeholder="Phone Number" style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TextInput placeholder="College / University" style={{ borderWidth: 1, width: 200, marginBottom: 10 }} />
      <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteProfile;
