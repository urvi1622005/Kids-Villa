import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import Carousel from "react-native-snap-carousel";
import { Drawer } from "react-native-drawer-layout";
import { Feather, MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample Data
  const recentScans = [
    { id: "1", name: "Math Paper", date: "Feb 28, 2025", thumbnail: require("../assets/logo.jpg") },
    { id: "2", name: "Physics Notes", date: "Feb 27, 2025", thumbnail: require("../assets/logo.jpg") },
    { id: "3", name: "Chemistry Formulae", date: "Feb 26, 2025", thumbnail: require("../assets/logo.jpg") },
  ];

  const savedFiles = [
    { id: "1", name: "Project Proposal", date: "Feb 20, 2025", type: "PDF" },
    { id: "2", name: "Meeting Notes", date: "Feb 15, 2025", type: "TXT" },
    { id: "3", name: "Receipt Scan", date: "Feb 10, 2025", type: "JPG" },
  ];

  const sliderImages = [
    { id: "1", src: require("../assets/logo.jpg"), caption: "Scan Documents Easily" },
    { id: "2", src: require("../assets/logo.jpg"), caption: "Chat with AI" },
    { id: "3", src: require("../assets/logo.jpg"), caption: "Save & Export" },
  ];

  const quickTips = [
    { id: "1", tip: "Use high-contrast images for better OCR results." },
    { id: "2", tip: "Tap the AI Chat for instant text analysis." },
    { id: "3", tip: "Save files in multiple formats for flexibility." },
  ];

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

  const renderSidebar = () => (
    <LinearGradient colors={["#1E293B", "#334155"]} style={styles.sidebar}>
      <View style={styles.sidebarHeader}>
        <Text style={styles.sidebarHeaderText}>Menu</Text>
        <TouchableOpacity onPress={() => setIsSidebarOpen(false)}>
          <Feather name="x" size={28} color="#F8FAFC" />
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
            <MaterialIcons name={item.icon} size={26} color="#60A5FA" />
            <Text style={styles.sidebarItemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.src} style={styles.carouselImage} resizeMode="cover" />
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        style={styles.carouselOverlay}
      >
        <Text style={styles.carouselCaption}>{item.caption}</Text>
      </LinearGradient>
    </View>
  );

  return (
    <Drawer
      open={isSidebarOpen}
      onOpen={() => setIsSidebarOpen(true)}
      onClose={() => setIsSidebarOpen(false)}
      renderDrawerContent={renderSidebar}
    >
      <LinearGradient colors={["#0F172A", "#1E40AF"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={28} color="#F8FAFC" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Document Scanner</Text>
            <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
              <Feather name="menu" size={28} color="#F8FAFC" />
            </TouchableOpacity>
          </View>

          {/* Carousel */}
          <Carousel
            data={sliderImages}
            renderItem={renderCarouselItem}
            sliderWidth={width}
            itemWidth={width * 0.85}
            loop
            autoplay
            autoplayInterval={3000}
          />

          {/* Buttons */}
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring", damping: 15 }}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Scanner")}
            >
              <LinearGradient colors={["#3B82F6", "#1E40AF"]} style={styles.buttonGradient}>
                <Ionicons name="scan" size={24} color="#F8FAFC" />
                <Text style={styles.buttonText}>Scan Document</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("AIChat")}
            >
              <LinearGradient colors={["#10B981", "#047857"]} style={styles.buttonGradient}>
                <FontAwesome name="comments" size={24} color="#F8FAFC" />
                <Text style={styles.buttonText}>Chat with AI</Text>
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>

          {/* Recent Scans */}
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <FlatList
            data={recentScans}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.thumbnail} style={styles.cardThumbnail} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.date}</Text>
                </View>
              </View>
            )}
            ListFooterComponent={<View style={{ height: 20 }} />}
          />

          {/* Saved Files */}
          <Text style={styles.sectionTitle}>Saved Files</Text>
          <FlatList
            data={savedFiles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <MaterialIcons
                  name={item.type === "PDF" ? "picture-as-pdf" : "description"}
                  size={40}
                  color="#60A5FA"
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{`${item.date} • ${item.type}`}</Text>
                </View>
              </View>
            )}
            ListFooterComponent={<View style={{ height: 20 }} />}
          />

          {/* Quick Tips */}
          <Text style={styles.sectionTitle}>Quick Tips</Text>
          <FlatList
            data={quickTips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.tipCard}>
                <Ionicons name="bulb-outline" size={24} color="#FBBF24" />
                <Text style={styles.tipText}>{item.tip}</Text>
              </View>
            )}
            ListFooterComponent={<View style={{ height: 40 }} />}
          />
        </ScrollView>
      </LinearGradient>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
    textShadowColor: "rgba(96, 165, 250, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  carouselItem: {
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  carouselImage: {
    width: width * 0.85,
    height: 180,
  },
  carouselOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  carouselCaption: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    gap: 15,
  },
  primaryButton: {
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  buttonText: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC",
    marginTop: 30,
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#D1D5DB",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A3447",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  tipText: {
    color: "#F8FAFC",
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  sidebar: {
    flex: 1,
    padding: 20,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  sidebarHeaderText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F8FAFC",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "rgba(71, 85, 105, 0.2)",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sidebarItemText: {
    fontSize: 18,
    color: "#F8FAFC",
    marginLeft: 15,
    fontWeight: "500",
  },
});

export default HomeScreen;