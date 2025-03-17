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
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function AIChatScreen() {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
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

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={require("../assets/bot.jpg")} style={styles.botIcon} />
          <Text style={styles.headerText}>AI Chatbot</Text>
          <View style={{ width: 30 }} /> {/* Placeholder for alignment */}
        </Animated.View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={true}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
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

        {/* Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={(text) => {
              setInput(text);
              setError("");
            }}
            placeholder="Ask something..."
            placeholderTextColor="#bbb"
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
              <Text style={styles.sendButtonText}>➤</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#292929",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  botIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    minHeight: '100%',
  },
  messageBubble: {
    padding: 12,
    marginBottom: 10,
    maxWidth: "75%",
    borderRadius: 18,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#292929",
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#3c3c3c",
    color: "#fff",
    minHeight: 40,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 12,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});