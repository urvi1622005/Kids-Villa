import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
  TouchableOpacity,
  SafeAreaView, // Use SafeAreaView
} from "react-native";

export default function AIChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const scrollViewRef = useRef();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []); // Run only on initial mount

  useEffect(() => {
    // Scroll to end with a slight delay after content size changes
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const fetchAIResponse = async () => {
    if (!input.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, isUser: true },
    ]);

    try {
      const API_URL = "http://localhost:5000/api/gemini/generate";
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.text, isUser: false },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Image
            source={require("../assets/bot.jpg")}
            style={styles.botIcon}
          />
          <Text style={styles.headerText}>AI Chatbot</Text>
        </Animated.View>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.chatContainer}>
            {messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  message.isUser ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={(text) => {
              setInput(text);
              setError("");
            }}
            placeholder="Type your question..."
            placeholderTextColor="#999"
            style={styles.input}
            multiline
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={fetchAIResponse}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.sendButtonText}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#2c2c2c",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  botIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 0,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  chatContainer: {
    flex: 1,
  },
  messageBubble: {
    padding: 15,
    marginBottom: 10,
    maxWidth: "80%",
    borderRadius: 0,
  },
  userMessage: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#444",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2c2c2c",
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 0,
    padding: 15,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: "#3c3c3c",
    color: "#fff",
    textAlignVertical: "top",
    minHeight: 60,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});