import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Me from "../../assets/me.jpg";

const screenWidth = Dimensions.get("window").width;
const numColumns = 3;

// Mock data for posts
const mockPosts = Array.from({ length: 12 }).map((_, i) => ({
  id: i.toString(),
  image: `https://picsum.photos/400/400?random=${i + 1}`,
}));

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState("grid");

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.profileRow}>
            <Image source={Me} style={styles.profileImage} />

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>120</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2.4K</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>340</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          {/* Name & Bio */}
          <View style={styles.bioContainer}>
            <Text style={styles.username}>Umar Sulaiman</Text>
            <Text style={styles.bioText}>
              💻 Software Developer | Football enthusiat ⚽{"\n"}Developing apps
              for great user experience.
            </Text>
            <Text style={styles.linkText}>omarologyy.com</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Share profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-add-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Story Highlights */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.highlightsContainer}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <View key={num} style={styles.highlightItem}>
                <Image
                  source={{
                    uri: `https://picsum.photos/100/100?random=${num}`,
                  }}
                  style={styles.highlightImage}
                />
                <Text style={styles.highlightLabel}>Story {num}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tab Section */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setSelectedTab("grid")}>
            <Ionicons
              name={selectedTab === "grid" ? "grid" : "grid-outline"}
              size={26}
              color={selectedTab === "grid" ? "#000" : "#999"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("tagged")}>
            <Ionicons
              name={
                selectedTab === "tagged"
                  ? "person-circle"
                  : "person-circle-outline"
              }
              size={26}
              color={selectedTab === "tagged" ? "#000" : "#999"}
            />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        {selectedTab === "grid" ? (
          <FlatList
            data={mockPosts}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}
          />
        ) : (
          <View style={styles.taggedPlaceholder}>
            <Ionicons name="person-circle-outline" size={80} color="#aaa" />
            <Text style={styles.placeholderText}>No tagged photos yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  statsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
    fontSize: 18,
  },
  statLabel: {
    color: "#777",
  },
  bioContainer: {
    marginTop: 10,
  },
  username: {
    fontWeight: "600",
    fontSize: 16,
  },
  bioText: {
    color: "#333",
    marginTop: 5,
  },
  linkText: {
    color: "#007AFF",
    marginTop: 5,
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 6,
    marginHorizontal: 4,
    alignItems: "center",
  },
  editButtonText: {
    fontWeight: "500",
  },
  iconButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 6,
  },
  highlightsContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  highlightItem: {
    alignItems: "center",
    marginRight: 15,
  },
  highlightImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  highlightLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 8,
    marginTop: 10,
  },
  postImage: {
    width: screenWidth / numColumns,
    height: screenWidth / numColumns,
  },
  taggedPlaceholder: {
    alignItems: "center",
    padding: 40,
  },
  placeholderText: {
    marginTop: 10,
    color: "#777",
  },
});
