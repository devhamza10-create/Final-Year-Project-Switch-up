import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Pressable, PressableProps } from "react-native";

type ThemedPressableProps = PressableProps & {
  children: React.ReactNode;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedPressable({
  children,
  onPress,
  lightColor,
  darkColor,
  style,
  ...props
}: ThemedPressableProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <Pressable
      onPress={onPress}
      style={[{ backgroundColor }, style] as any}
      {...props}
    >
      {children}
    </Pressable>
  );
}
