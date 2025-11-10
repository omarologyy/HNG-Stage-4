import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const stories = [
  { id: 1, name: "Your Story", image: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "alex", image: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "jess", image: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "mike", image: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "ella", image: "https://i.pravatar.cc/100?img=5" },
];

const posts = [
  {
    id: 1,
    user: "alex",
    image: "https://picsum.photos/500/500?random=1",
    likes: 120,
    caption: "Chilling by the beach 🌊",
  },
  {
    id: 2,
    user: "jess",
    image: "https://picsum.photos/500/500?random=2",
    likes: 98,
    caption: "Sunday vibes ☀️",
  },
];

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>Flamez</Text>
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

      {/* Stories */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {stories.map((story) => (
            <View key={story.id} style={styles.story}>
              <Image source={{ uri: story.image }} style={styles.storyImage} />
              <Text style={styles.storyName}>{story.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Feed */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <Image
                source={{ uri: `https://i.pravatar.cc/100?u=${post.user}` }}
                style={styles.postAvatar}
              />
              <Text style={styles.postUser}>{post.user}</Text>
            </View>

            {/* Post Image */}
            <Image source={{ uri: post.image }} style={styles.postImage} />

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
                <Ionicons name="paper-plane-outline" size={26} color="black" />
              </View>
              <Ionicons name="bookmark-outline" size={26} color="black" />
            </View>

            {/* Post Details */}
            <Text style={styles.likes}>{post.likes} likes</Text>
            <Text style={styles.caption}>
              <Text style={{ fontWeight: "bold" }}>{post.user} </Text>
              {post.caption}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  story: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#f58529",
  },
  storyName: {
    fontSize: 12,
    marginTop: 5,
  },
  feed: {
    flex: 1,
  },
  post: {
    marginBottom: 25,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUser: {
    fontWeight: "600",
  },
  postImage: {
    width: "100%",
    height: 400,
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
  likes: {
    fontWeight: "600",
    paddingHorizontal: 15,
  },
  caption: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
});
