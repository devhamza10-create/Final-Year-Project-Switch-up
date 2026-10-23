import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/styles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { Bell, MoveLeft } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
type HeaderProps = {
  type?: "default" | "home";
  text: string;
  lightColor?: string;
  darkColor?: string;
  showBackButton?: boolean;
};
export default function Header({
  type = "default",
  text,
  lightColor,
  darkColor,
  showBackButton = false,
}: HeaderProps) {
  const router = useRouter();
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const iconColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const handleBack = () => {
    router.back();
  };

  function Home() {
    return (
      <View style={[styles.home, { backgroundColor: color }]}>
        <ThemedText
          lightColor={Colors.light.primary}
          darkColor={Colors.dark.secondary}
          type="defaultSemiBold"
        >
          {text}
        </ThemedText>
        <Bell size={22} color={iconColor} />
      </View>
    );
  }

  function Default() {
    return (
      <View style={[styles.default, { backgroundColor: color }]}>
        {showBackButton && (
          <Pressable onPress={handleBack}>
            <MoveLeft size={22} color={iconColor} />
          </Pressable>
        )}
        <ThemedView
          lightColor="transparent"
          darkColor="transparent"
          style={{ flex: 1, alignItems: "center" }}
        >
          <ThemedText
            type="defaultSemiBold"
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.secondary}
          >
            {text}
          </ThemedText>
        </ThemedView>
      </View>
    );
  }

  const component = {
    default: <Default />,
    home: <Home />,
  };

  return component[type];
}

const styles = StyleSheet.create({
  home: {
    height: 64,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  default: {
    height: 64,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
});
