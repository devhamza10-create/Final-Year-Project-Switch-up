import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type ThemedButtonProps = TouchableOpacityProps & {
  text?: string;
  type?: "primary" | "secondary" | "outline";
  lightColor?: string;
  darkColor?: string;
  textLightColor?: string;
  textDarkColor?: string;
  textStyle?: TextStyle;
  buttonStyle?: StyleProp<ViewStyle>;
  renderChildren?: () => React.ReactNode;
};

const ThemedButton = ({
  text,
  type = "primary",
  lightColor,
  darkColor,
  renderChildren,
  ...props
}: ThemedButtonProps) => {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );
  const textColor = useThemeColor(
    { light: props?.textLightColor, dark: props?.textDarkColor },
    "text"
  );

  const typeStyles = {
    primary: { ...styles.primary, backgroundColor: color },
    secondary: { ...styles.secondary, backgroundColor: color },
    outline: { ...styles.outline, backgroundColor: "transparent" },
  };
  return (
    <TouchableOpacity
      style={[
        typeStyles[type],
        styles.default,
        props?.buttonStyle,
        props?.disabled && styles.disabled,
      ]}
      {...props}
    >
      {renderChildren ? (
        renderChildren()
      ) : (
        <Text style={[styles.text, { color: textColor }, props?.textStyle]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  default: {
    height: 52,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: Colors.light.primary,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
    backgroundColor: "transparent",
  },
  secondary: {
    backgroundColor: "gray",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: Colors.light.gray,
  },
});
