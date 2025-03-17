import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti"; // ✅ Using moti for animations
import Carousel from "react-native-snap-carousel";
import { Drawer } from "react-native-drawer-layout"; // ✅ For sidebar navigation
import { Feather, MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons"; // ✅ Icons for sidebar and buttons

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const recentScans = [
    { id: "1", name: "Math Paper", date: "Feb 28, 2025" },
    { id: "2", name: "Physics Notes", date: "Feb 27, 2025" },
    { id: "3", name: "Chemistry Formulae", date: "Feb 26, 2025" },
  ];

  const sliderImages = [
    { id: "1", src: require("../assets/logo.jpg") },
    { id: "2", src: require("../assets/logo.jpg") },
    { id: "3", src: require("../assets/logo.jpg") },
  ];

  // Sidebar Navigation Items
  const sidebarItems = [
    { id: "1", title: "Saved Files", icon: "save", screen: "SavedFiles" },
    { id: "2", title: "Explore Templates", icon: "template", screen: "ExploreTemplates" },
    { id: "3", title: "Scanner", icon: "camera", screen: "Scanner" },
    { id: "4", title: "Export Text", icon: "export", screen: "ExportText" },
    { id: "5", title: "Export Template", icon: "file-export", screen: "ExportTemplate" },
    { id: "6", title: "Help & FAQ", icon: "help-circle", screen: "HelpFAQ" },
    { id: "7", title: "Rate Us", icon: "star", screen: "RateUs" },
    { id: "8", title: "Contact Us", icon: "mail", screen: "ContactUs" },
    { id: "9", title: "Settings", icon: "settings", screen: "Settings" },
  ];

  // Render Sidebar
  const renderSidebar = () => (
    <View style={styles.sidebar}>
      <View style={styles.sidebarHeader}>
        <Text style={styles.sidebarHeaderText}>Menu</Text>
        <TouchableOpacity onPress={() => setIsSidebarOpen(false)}>
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={sidebarItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sidebarItem}
            onPress={() => {
              navigation.navigate(item.screen);
              setIsSidebarOpen(false);
            }}
          >
            <MaterialIcons name={item.icon} size={24} color="#fff" />
            <Text style={styles.sidebarItemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <Drawer
      open={isSidebarOpen}
      onOpen={() => setIsSidebarOpen(true)}
      onClose={() => setIsSidebarOpen(false)}
      renderDrawerContent={renderSidebar}
    >
      <ScrollView style={styles.container}>
        {/* Header with Menu and Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ cursor: 'pointer' }}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Document Scanner</Text>
          <TouchableOpacity onPress={() => setIsSidebarOpen(true)} style={{ cursor: 'pointer' }}>
            <Feather name="menu" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Image Carousel */}
        <Carousel
          data={sliderImages}
          renderItem={({ item }) => (
            <Image source={item.src} style={styles.carouselImage} resizeMode="cover" />
          )}
          sliderWidth={width}
          itemWidth={300}
          loop
          autoplay
        />

        {/* Scan Document Button with Animation */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 10 }}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Scanner")}
          >
            <Ionicons name="scan" size={24} color="#fff" />
            <Text style={styles.buttonText}>Scan Document</Text>
          </TouchableOpacity>
        </MotiView>

        {/* AI Chat Button */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 10, delay: 200 }}
        >
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: "#10B981" }]}
            onPress={() => navigation.navigate("AIChat")}
          >
            <FontAwesome name="comments" size={24} color="#fff" />
            <Text style={styles.buttonText}>Chat with AI</Text>
          </TouchableOpacity>
        </MotiView>

        {/* Recent Scans Section */}
        <Text style={styles.sectionTitle}>Recent Scans</Text>
        <FlatList
          data={recentScans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recentScanItem}>
              <Text style={styles.recentScanName}>{item.name}</Text>
              <Text style={styles.recentScanDate}>{item.date}</Text>
            </View>
          )}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      </ScrollView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  carouselImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 24,
    marginBottom: 12,
  },
  recentScanItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentScanName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  recentScanDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#1F2937",
    padding: 16,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sidebarHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  sidebarItemText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 16,
  },
});

export default HomeScreen;