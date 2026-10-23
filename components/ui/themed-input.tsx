import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/styles";
import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  type?: "default" | "password";
};

export default function ThemedInput({
  lightColor,
  darkColor,
  containerStyle,
  type = "default",
  inputStyle,
  ...props
}: ThemedInputProps) {
  const color = useThemeColor(
    {
      light: lightColor ?? Colors.light.primary,
      dark: darkColor ?? Colors.dark.primary,
    },
    "background"
  );

  const textColor = useThemeColor(
    {
      light: lightColor ?? Colors.light.primary,
      dark: darkColor ?? Colors.dark.textLight,
    },
    "text"
  );

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <View
      style={[
        styles.container,
        { borderColor: isFocused ? color : Colors.light.border },
        containerStyle,
      ]}
    >
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, inputStyle, { color: textColor }]}
        placeholderTextColor={Colors.light.textLight}
        {...props}
        secureTextEntry={type === "password" && !isPasswordVisible}
      />
      {type === "password" && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={Colors.light.textLight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52,
    borderWidth: 1.5,
    borderRadius: 5,
    backgroundColor: "transparent",
    borderColor: Colors.light.gray,
    display: "flex",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 15,
  },
});
