import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ddd" },
          headerTintColor: "#333",
        }}
      >
        {/* Individual Screens */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      </Stack>
    </>
  );
};

export default RootLayout;
