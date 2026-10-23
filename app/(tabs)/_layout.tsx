import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/styles";
import { Tabs } from "expo-router";
import { Bell, House, List, Plus, User } from "lucide-react-native";
import React from "react";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor : Colors.light.primaryDark,
        tabBarStyle: {
          height: 64,
        },
        tabBarIconStyle: {
          marginBottom: Spacing.xs
        },
        headerPressColor: "transparent",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: "Listings",
          tabBarIcon: ({ color, size }) => (
            <List color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="new-listing"
        options={{
          title: "New Listing",
          tabBarIcon: ({ color, size }) => (
            <Plus color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Bell color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}