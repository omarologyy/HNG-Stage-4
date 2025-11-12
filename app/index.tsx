import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import Logo from "../assets/logo.jpg";

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image source={Logo} style={styles.logo} />

        {/* Title */}
        <Text style={styles.title}>Framez</Text>
        <Text style={styles.subtitle}>Every Moment, Perfectly Captured.</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Your People, Your Feed.</Text>

        {/* Buttons */}
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/register" asChild>
          <TouchableOpacity style={styles.registerBtn}>
            <Text style={styles.registerText}>Create an Account</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>© 2025 Framez, Inc.</Text>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // centers vertically
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 5,
  },
  tagline: {
    marginTop: 20,
    fontSize: 14,
    color: "#777",
    marginBottom: 40,
  },
  loginBtn: {
    width: 230,
    backgroundColor: "#3797EF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerBtn: {
    width: 230,
    borderWidth: 1.5,
    borderColor: "#3797EF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  registerText: {
    color: "#3797EF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
});
