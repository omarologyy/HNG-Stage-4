import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Constants from "expo-constants";

// 🔹 Import generated API types (adjust path if needed)
import { api } from "../convex/_generated/api";

// ✅ Initialize Convex client with your deployment URL
const convex = new ConvexReactClient(
  Constants.expoConfig?.extra?.CONVEX_URL ||
    "https://brainy-impala-550.convex.cloud"
);

const RootLayout = () => {
  return (
    <ConvexProvider client={convex}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ddd" },
          headerTintColor: "#333",
        }}
      >
        {/* Route groups and screens */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
      </Stack>
    </ConvexProvider>
  );
};

export default RootLayout;
