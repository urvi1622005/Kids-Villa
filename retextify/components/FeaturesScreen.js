import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FeaturesScreen = ({ navigation }) => {
  const features = [
    {
      id: '1',
      title: 'Scan Documents',
      description: 'Capture and convert paper documents into digital formats with ease.',
      icon: 'scan',
      color: '#3B82F6',
    },
    {
      id: '2',
      title: 'AI Chat',
      description: 'Interact with AI to analyze and enhance your scanned content.',
      icon: 'chatbubble-ellipses',
      color: '#10B981',
    },
    {
      id: '3',
      title: 'Template Conversion',
      description: 'Transform scans into professional templates effortlessly.',
      icon: 'document-text',
      color: '#F59E0B',
    },
    {
      id: '4',
      title: 'Save & Export',
      description: 'Store files securely and export in multiple formats.',
      icon: 'save',
      color: '#EC4899',
    },
  ];

  return (
    <LinearGradient colors={['#0F172A', '#1E40AF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Discover Our Features</Text>
        <Text style={styles.subtitle}>
          Explore how Template Converter simplifies your workflow.
        </Text>

        {features.map((feature, index) => (
          <MotiView
            key={feature.id}
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              delay: index * 200, // Staggered animation
            }}
            style={styles.featureCard}
          >
            <LinearGradient
              colors={[feature.color, `${feature.color}99`]} // Gradient with transparency
              style={styles.cardGradient}
            >
              <Ionicons name={feature.icon} size={40} color="#F8FAFC" style={styles.icon} />
              <View style={styles.cardContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </LinearGradient>
          </MotiView>
        ))}

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15, delay: features.length * 200 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.replace('Login')}
          >
            <LinearGradient
              colors={['#3B82F6', '#1E40AF']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F8FAFC',
    textShadowColor: 'rgba(96, 165, 250, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  featureCard: {
    width: width * 0.9,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  getStartedButton: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
});

export default FeaturesScreen;