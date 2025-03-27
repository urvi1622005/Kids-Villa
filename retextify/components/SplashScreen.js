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
      navigation.replace('Login'); // Navigate to Login after 3.5 seconds
    }, 3500);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#0F172A', '#1E40AF', '#3B82F6']} // Richer gradient with more depth
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Background Particle Effects */}
        <MotiView
          from={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 0.2, translateY: 50 }}
          transition={{ type: 'timing', duration: 3000, loop: true }}
          style={styles.particle1}
        />
        <MotiView
          from={{ opacity: 0, translateX: -30 }}
          animate={{ opacity: 0.15, translateX: 30 }}
          transition={{ type: 'timing', duration: 2500, loop: true }}
          style={styles.particle2}
        />

        {/* Logo with Enhanced Animation */}
        <MotiView
          from={{ opacity: 0, scale: 0.5, rotate: '0deg' }}
          animate={{ opacity: 1, scale: 1.1, rotate: '5deg' }}
          transition={{
            type: 'spring',
            damping: 12,
            stiffness: 100,
            delay: 200,
          }}
          style={styles.logoContainer}
        >
          <Image source={require('../assets/icon.png')} style={styles.logo} />
        </MotiView>

        {/* Title with Dynamic Animation */}
        <MotiText
          from={{ opacity: 0, translateY: 50, scale: 0.8 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 120,
            delay: 600,
          }}
          style={styles.title}
        >
          Template Converter
        </MotiText>

        {/* Subtitle with Fade-In and Slight Bounce */}
        <MotiText
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 18,
            stiffness: 100,
            delay: 900,
          }}
          style={styles.subtitle}
        >
          Transform old papers into new formats seamlessly
        </MotiText>

        {/* Loading Indicator with Glow and Pulse */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 1200,
            loop: true,
            repeatReverse: true,
          }}
          style={styles.loaderContainer}
        >
          <ActivityIndicator size="large" color="#60A5FA" />
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 800, delay: 1400 }}
            style={styles.loadingText}
          >
            Loading...
          </MotiText>
        </MotiView>

        {/* Version Number (Optional Footer) */}
        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ type: 'timing', duration: 800, delay: 1600 }}
          style={styles.versionText}
        >
          v1.0.0
        </MotiText>
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
    paddingVertical: 60, // Increased padding for better spacing
  },
  particle1: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#60A5FA',
    borderRadius: 25,
    top: '20%',
    left: '15%',
    opacity: 0.2,
  },
  particle2: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#3B82F6',
    borderRadius: 15,
    top: '60%',
    right: '20%',
    opacity: 0.15,
  },
  logoContainer: {
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle glow effect
    borderRadius: 30,
    padding: 10,
  },
  logo: {
    width: 140, // Slightly larger for impact
    height: 140,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#60A5FA',
  },
  title: {
    fontSize: 38, // Larger for emphasis
    fontWeight: '800',
    color: '#F8FAFC',
    textShadowColor: 'rgba(96, 165, 250, 0.5)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    marginBottom: 15,
    letterSpacing: 1, // Adds polish
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 40,
    fontWeight: '400',
    lineHeight: 24, // Better readability
  },
  loaderContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(96, 165, 250, 0.1)', // Subtle glow
    padding: 15,
    borderRadius: 20,
    shadowColor: '#60A5FA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingText: {
    fontSize: 16,
    color: '#60A5FA',
    marginTop: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  versionText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
});

export default SplashScreen;