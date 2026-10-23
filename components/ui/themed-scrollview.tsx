import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";

type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedScrollView({
  lightColor,
  darkColor,
  children,
  ...props
}: ThemedScrollViewProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return (
    <ScrollView {...props} style={{ backgroundColor: color }}>
      {children}
    </ScrollView>
  );
}
