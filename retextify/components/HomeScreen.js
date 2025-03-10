import React from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti"; // ✅ Using moti for animations
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();

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

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <Text className="text-2xl font-bold text-gray-900 mb-4">Document Scanner</Text>

      {/* Image Carousel */}
      <Carousel
        data={sliderImages}
        renderItem={({ item }) => (
          <Image source={item.src} className="w-full h-40 rounded-lg" resizeMode="cover" />
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
          className="bg-blue-500 p-4 mt-4 rounded-2xl flex-row items-center justify-center shadow-lg"
          onPress={() => navigation.navigate("Scanner")}
        >
          <Text className="text-white text-lg font-semibold">Scan Document</Text>
        </TouchableOpacity>
      </MotiView>

      {/* AI Chat Button */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 10, delay: 200 }}
      >
        <TouchableOpacity
          className="bg-green-500 p-4 mt-4 rounded-2xl flex-row items-center justify-center shadow-lg"
          onPress={() => navigation.navigate("AIChat")}
        >
          <Text className="text-white text-lg font-semibold">Chat with AI</Text>
        </TouchableOpacity>
      </MotiView>

      {/* Recent Scans Section */}
      <Text className="text-lg font-semibold text-gray-800 mt-6">Recent Scans</Text>
      <FlatList
        data={recentScans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mt-2 rounded-lg shadow-md">
            <Text className="text-gray-900 font-medium">{item.name}</Text>
            <Text className="text-gray-500 text-sm">{item.date}</Text>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 20 }} />} // ✅ Adds spacing at the bottom
      />
    </ScrollView>
  );
};

export default HomeScreen;
