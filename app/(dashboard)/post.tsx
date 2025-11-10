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

const sampleImages = [
  "https://picsum.photos/400/400?random=1",
  "https://picsum.photos/400/400?random=2",
  "https://picsum.photos/400/400?random=3",
];

const PostMedia = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const pickImage = async () => {
    // Mock: randomly choose one of the sample images
    const randomImage =
      sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setImage(randomImage);
    Alert.alert("Mock Image Picker", "Random image selected!");
  };

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.title}>New Post</Text>

        <TouchableOpacity>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Preview */}
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

        {/* Extra Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Tag people</Text>
            <Ionicons name="chevron-forward" size={20} color="#777" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Add location</Text>
            <Ionicons name="chevron-forward" size={20} color="#777" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Advanced settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#777" />
          </TouchableOpacity>
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
  optionsContainer: {
    marginTop: 25,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
