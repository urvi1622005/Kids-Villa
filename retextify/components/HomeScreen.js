import React from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { motion } from "framer-motion";
import Carousel from "react-native-snap-carousel";

const HomeScreen = () => {
  const navigation = useNavigation();

  const recentScans = [
    { id: "1", name: "Math Paper", date: "Feb 28, 2025" },
    { id: "2", name: "Physics Notes", date: "Feb 27, 2025" },
  ];

  const sliderImages = [
    { id: "1", src: require("../assets/slide1.png") },
    { id: "2", src: require("../assets/slide2.png") },
    { id: "3", src: require("../assets/slide3.png") },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Document Scanner</Text>
      
      <Carousel
        data={sliderImages}
        renderItem={({ item }) => (
          <Image source={item.src} className="w-full h-40 rounded-lg" resizeMode="cover" />
        )}
        sliderWidth={400}
        itemWidth={300}
        loop={true}
        autoplay={true}
      />
      
      <motion.View animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <TouchableOpacity
          className="bg-blue-500 p-4 mt-4 rounded-2xl flex-row items-center justify-center shadow-lg"
          onPress={() => navigation.navigate("Scanner")}
        >
          <Text className="text-white text-lg font-semibold">Scan Document</Text>
        </TouchableOpacity>
      </motion.View>
      
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
      />
    </ScrollView>
  );
};

export default HomeScreen;
