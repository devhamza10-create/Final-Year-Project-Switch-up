import { useThemeColor } from "@/hooks/useThemeColor";
import { LucideProps } from "lucide-react-native";
import React from "react";
type ThemedIconProps = {
  icon: React.ReactNode;
  props: LucideProps;
  lightFillColor?: string;
  darkFillColor?: string;
  lightStrokeColor?: string;
  darkStrokeColor?: string;
  type?: "fill" | "stroke" | "fillWithStroke";
};

export default function ThemedIcon({
  icon,
  props,
  lightFillColor,
  darkFillColor,
  lightStrokeColor,
  darkStrokeColor,
  type = "fillWithStroke",
}: ThemedIconProps) {
  const fillColor = useThemeColor(
    { light: lightFillColor, dark: darkFillColor },
    "text"
  );
  const strokeColor = useThemeColor(
    { light: lightStrokeColor, dark: darkStrokeColor },
    "text"
  );

  const style = {
    fill:
      type === "fill"
        ? fillColor
        : type === "fillWithStroke"
        ? fillColor
        : "none",
    color:
      type === "stroke"
        ? strokeColor
        : type === "fillWithStroke"
        ? strokeColor
        : "none",
  };

  if (!React.isValidElement(icon)) {
    return null;
  }
  return React.cloneElement(icon, {
    ...style,
    ...props,
  });
}
