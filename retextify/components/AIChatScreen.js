import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

export default function AIChatScreen() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const fetchAIResponse = async () => {
    console.log("Fetching AI response..."); // Log when the function starts
    console.log("Input:", input); // Log the input being sent

    try {
      const res = await fetch("http://localhost:5000/api/gemini/generate", {
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
      setResponse("Failed to fetch response. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ask AI:</Text>
      <TextInput
        value={input}
        onChangeText={(text) => {
          console.log("Input changed:", text); // Log input changes
          setInput(text);
        }}
        placeholder="Type your question..."
        style={styles.input}
      />
      <Button
        title="Generate"
        onPress={() => {
          console.log("Generate button pressed"); // Log button press
          fetchAIResponse();
        }}
      />
      <ScrollView style={styles.responseContainer}>
        <Text>{response}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  responseContainer: {
    marginTop: 20,
  },
});