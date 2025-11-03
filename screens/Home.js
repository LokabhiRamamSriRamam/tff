// screens/Home.js
import React, { useEffect, useCallback, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import ProductCarousel from "../components/productCarousel";
import { scale } from "react-native-size-matters";
import { appColors } from "../utils/appColors";

// Example carousel data (you can replace this with your backend-driven config)
const carousels = [
  { title: "Best Sellers", category: "all", label: "bestseller" },
  { title: "Paneer Specials", category: "paneer", label: "recommended" },
  { title: "Rice & Grains", category: "rice", label: "popular" },
  { title: "Dairy Favorites", category: "dairy", label: "trending" },
  { title: "Snacks & Namkeen", category: "snacks", label: "bestseller" },
];

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleSections, setVisibleSections] = useState({});

  // Track scroll position to trigger lazy loading
  const handleScroll = useCallback(
    (event) => {
      const yOffset = event.nativeEvent.contentOffset.y;
      carousels.forEach((_, index) => {
        const triggerPoint = index * 300; // Approximate offset for each carousel
        if (yOffset >= triggerPoint - 200 && !visibleSections[index]) {
          setVisibleSections((prev) => ({ ...prev, [index]: true }));
        }
      });
    },
    [visibleSections]
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate("SearchResults", { query: searchQuery });
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.container}
    >
      {/* 🔍 Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search for products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {/* 🧱 Product Carousels */}
      {carousels.map((carousel, index) => (
        <View key={index} style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>{carousel.title}</Text>
          {visibleSections[index] ? (
            <ProductCarousel
              category={carousel.category}
              label={carousel.label}
              navigation={navigation}
            />
          ) : (
            <Text style={styles.loadingText}>Scroll to load...</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors?.background || "#fff",
    paddingVertical: scale(10),
  },
  searchBarContainer: {
    marginHorizontal: scale(15),
    marginTop: scale(15),
    marginBottom: scale(10),
    backgroundColor: "#f0f0f0",
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
  },
  searchInput: {
    height: scale(40),
    fontSize: scale(14),
    color: "#333",
  },
  carouselContainer: {
    marginVertical: scale(10),
    paddingHorizontal: scale(10),
  },
  carouselTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    marginBottom: scale(8),
    color: "#222",
  },
  loadingText: {
    color: "#aaa",
    fontSize: scale(13),
    textAlign: "center",
    paddingVertical: scale(40),
  },
});
