import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "expo-router";

// Helper: format time in seconds/minutes
const timeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
};

const Home = () => {
  const router = useRouter();
  const user = auth.currentUser;
  const userId = user?.uid;

  // Fetch only posts by this user
  const posts = useQuery(
    api.functions.getPosts.default,
    userId ? { authorId: userId } : "skip"
  );

  // Live time updates every 30s
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  // Logout confirmation
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await signOut(auth);
          router.replace("/login");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>Flamezzz</Text>
        <View style={styles.icons}>
          <Ionicons
            name="heart-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </View>
      </View>

      {/* Feed */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {!userId ? (
          <Text style={styles.message}>Please log in to view your posts.</Text>
        ) : !posts ? (
          <ActivityIndicator
            size="large"
            color="#888"
            style={{ marginTop: 80 }}
          />
        ) : posts.length === 0 ? (
          <Text style={styles.message}>You haven’t made any posts yet.</Text>
        ) : (
          posts.map((post) => (
            <View key={post._id} style={styles.post}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <Image
                  source={{
                    uri:
                      user.photoURL ||
                      "https://i.pravatar.cc/150?u=" + post.authorId,
                  }}
                  style={styles.postAvatar}
                />
                <View>
                  <Text style={styles.postUser}>{post.authorName}</Text>
                  <Text style={styles.timestamp}>
                    {timeAgo(post.createdAt)}
                  </Text>
                </View>
              </View>

              {/* Post Image */}
              {post.imageUrl ? (
                <Image
                  source={{ uri: post.imageUrl }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ) : null}

              {/* Post Actions */}
              <View style={styles.postActions}>
                <View style={styles.actionIcons}>
                  <Ionicons
                    name="heart-outline"
                    size={26}
                    color="black"
                    style={styles.icon}
                  />
                  <Ionicons
                    name="chatbubble-outline"
                    size={26}
                    color="black"
                    style={styles.icon}
                  />
                  <Ionicons
                    name="paper-plane-outline"
                    size={26}
                    color="black"
                  />
                </View>
                <Ionicons name="bookmark-outline" size={26} color="black" />
              </View>

              {/* Post Caption */}
              <Text style={styles.caption}>
                <Text style={{ fontWeight: "bold" }}>{post.authorName} </Text>
                {post.text}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    paddingTop: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "sans-serif",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  feed: {
    flex: 1,
    marginTop: 10,
  },
  post: {
    marginBottom: 30,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  postAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  postUser: {
    fontWeight: "600",
    fontSize: 15,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  postImage: {
    width: "100%",
    height: 400,
    backgroundColor: "#eee",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  actionIcons: {
    flexDirection: "row",
  },
  caption: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontSize: 14,
  },
  message: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 16,
    color: "gray",
  },
  logoutButton: {
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#ff3b30",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
