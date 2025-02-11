import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TemplateChooser = ({ route }) => {
  const navigation = useNavigation();
  const { text } = route.params;

  // Custom Templates
  const templates = [
    {
      id: 1,
      name: "Resume Template",
      content: `John Doe
123 Main Street, City, State, ZIP
Phone: (123) 456-7890 | Email: john.doe@example.com

Objective:
To obtain a position as a Software Engineer where I can utilize my skills and experience to contribute to the success of the company.

Education:
Bachelor of Science in Computer Science
University of Example, Graduation Date: May 2020

Experience:
Software Engineer Intern
ABC Company, Summer 2019
- Developed and maintained web applications using React and Node.js
- Collaborated with the team to design and implement new features

Skills:
- Programming Languages: JavaScript, Python, Java
- Frameworks: React, Node.js, Express
- Tools: Git, Docker, AWS`,
    },
    {
      id: 2,
      name: "Old Document Template",
      content: `This is an example of an old document.

Date: January 1, 1900
To Whom It May Concern,

This document serves as a record of historical significance. It contains information about events that occurred in the past and is preserved for future generations.

Sincerely,
Historical Society`,
    },
    {
      id: 3,
      name: "Invoice Template",
      content: `Invoice #12345
Date: October 10, 2023

Bill To:
Jane Doe
456 Elm Street, City, State, ZIP

Description:
- Web Development Services: $500
- Hosting and Maintenance: $200

Total Amount Due: $700

Payment Due Date: November 10, 2023`,
    },
    {
      id: 4,
      name: "Letter Template",
      content: `October 10, 2023

Dear [Recipient's Name],

I am writing to inform you about an important matter. Please review the details below and let me know if you have any questions.

Sincerely,
[Your Name]`,
    },
  ];

  const handleTemplateSelection = (template) => {
    navigation.navigate("DocumentScanner", { updatedText: template.content });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose a Template</Text>
      <View style={styles.templateContainer}>
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={styles.templateButton}
            onPress={() => handleTemplateSelection(template)}
          >
            <Text style={styles.templateText}>{template.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  templateContainer: {
    width: "90%",
  },
  templateButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  templateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default TemplateChooser;