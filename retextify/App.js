import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import MainNavigation from '../retextify/components/Navigation.js';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNavigation />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
