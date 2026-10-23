import Header from "@/components/ui/top-header";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTab = withLayoutContext(Navigator);

export default function ProfileLayout() {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Header text="My Account" />
      <MaterialTopTab
        screenOptions={{
          swipeEnabled: true,
          lazy: true,
          sceneStyle: { backgroundColor: "#fff" },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.light.secondary,
          },
          
        }}
        style={{ flex: 1 }}
      >
        <MaterialTopTab.Screen
          name="index"
          options={{ headerShown: false, title: "Profile" }}
        />
        <MaterialTopTab.Screen
          name="setting"
          options={{ headerShown: false, title: "Setting" }}
        />
      </MaterialTopTab>
    </SafeAreaView>
  );
}
