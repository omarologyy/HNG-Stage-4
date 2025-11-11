import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { auth } from "../../firebaseConfig";

const screenWidth = Dimensions.get("window").width;
const numColumns = 3;

const UserProfile = () => {
  const user = auth.currentUser;
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fetch posts by the logged-in user
  const posts = useQuery(api.getUserPosts.getUserPosts, {
    authorId: user?.uid || "",
  });

  useEffect(() => {
    if (user) {
      setCurrentUser({
        name: user.displayName || "Anonymous",
        email: user.email,
        avatar: user.photoURL,
      });
    }
  }, [user]);

  if (!currentUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.profileRow}>
            <Image
              source={
                currentUser.avatar
                  ? { uri: currentUser.avatar }
                  : require("../../assets/avatar.jpg")
              }
              style={styles.profileImage}
            />

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{posts?.length || 0}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          {/* User Info */}
          <View style={styles.bioContainer}>
            <Text style={styles.username}>{currentUser.name}</Text>
            <Text style={styles.bioText}>{currentUser.email}</Text>
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
        </View>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item._id}
            numColumns={numColumns}
            scrollEnabled={false}
            renderItem={({ item }) =>
              item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.postImage}
                />
              ) : (
                <View style={styles.textPost}>
                  <Text style={styles.textPostContent}>{item.text}</Text>
                </View>
              )
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="image-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No posts yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerContainer: { paddingTop: 50, paddingHorizontal: 15 },
  profileRow: { flexDirection: "row", alignItems: "center" },
  profileImage: { width: 90, height: 90, borderRadius: 45 },
  statsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  statItem: { alignItems: "center" },
  statNumber: { fontWeight: "bold", fontSize: 18 },
  statLabel: { color: "#777" },
  bioContainer: { marginTop: 10 },
  username: { fontWeight: "600", fontSize: 16 },
  bioText: { color: "#333", marginTop: 5 },
  buttonsRow: { flexDirection: "row", marginTop: 15, alignItems: "center" },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 6,
    marginHorizontal: 4,
    alignItems: "center",
  },
  editButtonText: { fontWeight: "500" },
  iconButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 6,
  },
  postImage: {
    width: screenWidth / numColumns,
    height: screenWidth / numColumns,
  },
  textPost: {
    width: screenWidth / numColumns,
    height: screenWidth / numColumns,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 5,
  },
  textPostContent: { color: "#333", fontSize: 14, textAlign: "center" },
  emptyContainer: { alignItems: "center", padding: 40 },
  emptyText: { marginTop: 10, color: "#777" },
});
