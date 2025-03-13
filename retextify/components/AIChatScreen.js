import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function AIChatScreen() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAIResponse = async () => {
    if (!input.trim()) {
      setError("Please enter a question.");
      return;
    }

    console.log("Fetching AI response..."); // Log when the function starts
    console.log("Input:", input); // Log the input being sent

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http:// 172.20.10.3:5000/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      console.log("Response status:", res.status); // Log the response status

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("AI Response Data:", data); // Log the full response data

      setResponse(data.text);
    } catch (error) {
      console.error("Error fetching AI response:", error); // Log any errors
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Ask AI:</Text>
        <TextInput
          value={input}
          onChangeText={(text) => {
            console.log("Input changed:", text); 
            setInput(text);
            setError(""); 
          }}
          placeholder="Type your question..."
          placeholderTextColor="#999"
          style={styles.input}
          multiline
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.buttonContainer}>
          <Button
            title="Generate"
            onPress={() => {
              console.log("Generate button pressed"); 
              fetchAIResponse();
            }}
            disabled={loading}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    textAlignVertical: "top", // For multiline input
    minHeight: 100, // Minimum height for multiline input
  },
  buttonContainer: {
    marginBottom: 20,
  },
  responseContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
});