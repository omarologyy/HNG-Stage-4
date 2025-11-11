import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api"; // adjust path as needed
import { auth } from "../../firebaseConfig"; // your Firebase auth

const PostMedia = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const createPost = useMutation(api.createPost.default);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleShare = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be signed in to post.");
        return;
      }

      if (!caption.trim() && !image) {
        Alert.alert("Error", "Please write something or add an image.");
        return;
      }

      await createPost({
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        text: caption.trim(),
        imageUrl: image || undefined,
      });

      Alert.alert("Success", "Post created successfully!");
      setCaption("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.title}>New Post</Text>

        <TouchableOpacity onPress={handleShare}>
          <Text style={styles.shareText}>Send</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Picker */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="image-outline" size={50} color="#aaa" />
              <Text style={styles.placeholderText}>Tap to add photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Caption Input */}
        <View style={styles.captionContainer}>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#999"
            value={caption}
            onChangeText={setCaption}
            multiline
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PostMedia;

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
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  cancelText: {
    color: "#ff3b30",
    fontWeight: "500",
  },
  shareText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  imagePicker: {
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 10,
    color: "#aaa",
    fontSize: 14,
  },
  captionContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  captionInput: {
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    minHeight: 100,
  },
});
