import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // For the back button icon

const TemplateChooser = ({ route }) => {
  const navigation = useNavigation();
  const { text } = route.params;

  const categories = ["Resume", "Invoice", "Letter", "Business", "Personal"];

  const allTemplates = {
    Resume: [
      {
        id: 1,
        name: "Standard Resume",
        content: `John Doe\n123 Main Street, City, State, ZIP\nPhone: (123) 456-7890 | Email: john.doe@example.com\n\nObjective:\nTo obtain a position as a Software Engineer.`,
      },
      {
        id: 2,
        name: "Creative Resume",
        content: `Jane Doe\nInnovative Developer\nPortfolio: www.janedoe.com | Contact: jane.doe@example.com\n\nSummary:\nPassionate about front-end development and UI/UX design.`,
      },
    ],
    Invoice: [
      {
        id: 3,
        name: "Standard Invoice",
        content: `Invoice #56789\nBill To: XYZ Corp\nAmount Due: $1200\nDue Date: 15th March 2024.`,
      },
      {
        id: 4,
        name: "Freelancer Invoice",
        content: `Invoice #78901\nBill To: John Client\nService: Web Development\nTotal: $800 | Due: 10th Feb 2024.`,
      },
    ],
    Letter: [
      {
        id: 5,
        name: "Formal Letter",
        content: `Dear [Recipient],\nI hope this letter finds you well.\nSincerely,\n[Your Name]`,
      },
      {
        id: 6,
        name: "Casual Letter",
        content: `Hey [Friend],\nHope you are doing great! Let's catch up soon.`,
      },
    ],
    Business: [
      {
        id: 7,
        name: "Business Proposal",
        content: `Proposal for ABC Solutions\nProject Scope: Web development project for automation.`,
      },
      {
        id: 8,
        name: "Meeting Agenda",
        content: `Agenda:\n1. Review last meeting notes\n2. Discuss new project requirements.`,
      },
    ],
    Personal: [
      {
        id: 9,
        name: "Diary Entry",
        content: `Today was an amazing day! I explored a new coffee shop.`,
      },
      {
        id: 10,
        name: "Birthday Invitation",
        content: `You are invited to my birthday party on 25th March at XYZ Cafe!`,
      },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const templates = allTemplates[selectedCategory];

  const handleTemplateSelection = (template) => {
    navigation.navigate("OCRScreen", { updatedText: template.content });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Choose a Template</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={templates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.templateButton} onPress={() => handleTemplateSelection(item)}>
            <Text style={styles.templateText}>{item.name}</Text>
            <Text style={styles.templateDescription}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  templateButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  templateDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default TemplateChooser;