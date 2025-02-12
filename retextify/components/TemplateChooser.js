import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
      <Text style={styles.title}>Choose a Template</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={templates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.templateButton} onPress={() => handleTemplateSelection(item)}>
            <Text style={styles.templateText}>{item.name}</Text>
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
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#ddd",
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  templateButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: "90%",
    alignItems: "center",
  },
  templateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default TemplateChooser;