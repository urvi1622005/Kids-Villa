import React, { useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti'; // For animations

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login after 3 seconds
    }, 3000);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#0F172A', '#1E40AF']} // Modern gradient matching other screens
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo with Fade & Scale Animation */}
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={styles.logoContainer}
        >
          <Image source={require('../assets/icon.png')} style={styles.logo} />
        </MotiView>

        {/* Title with Slide-Up Animation */}
        <MotiText
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15, delay: 300 }}
          style={styles.title}
        >
          Template Converter
        </MotiText>

        {/* Subtitle with Slide-Up Animation */}
        <MotiText
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15, delay: 500 }}
          style={styles.subtitle}
        >
          Transform old papers into new formats seamlessly.
        </MotiText>

        {/* Loading Indicator with Pulse Animation */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'timing',
            duration: 800,
            delay: 700,
            loop: true, // Pulse effect
            repeatReverse: true,
          }}
          style={styles.loaderContainer}
        >
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text style={styles.loadingText}>Loading...</Text>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // Ensures content can grow beyond screen if needed
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20, // Slight rounding for polish
    borderWidth: 2,
    borderColor: '#60A5FA',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F8FAFC',
    textShadowColor: 'rgba(96, 165, 250, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  loaderContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#60A5FA',
    marginTop: 10,
    fontWeight: '500',
  },
});

export default SplashScreen;