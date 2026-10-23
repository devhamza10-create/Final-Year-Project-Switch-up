import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type ThemedTextareaProps = TextInputProps & {
  placeholder: string;
  lightColor?: string;
  darkColor?: string;
  borderColor?: string;
};

export default function ThemedTextarea({
  placeholder,
  lightColor,
  darkColor,
  ...props
}: ThemedTextareaProps) {
  const background = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const color = useThemeColor(
    {
      light: Colors.light.primary,
      dark: Colors.dark.primary,
    },
    "background"
  );

  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      placeholder={placeholder}
      multiline={true}
      {...props}
      style={[
        styles.input,
        {
          backgroundColor: background,
          textAlignVertical: "top",
          borderColor: focused ? color : Colors.light.border,
        },
      ]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    padding: 10,
    height: 82,
    borderWidth: 1.5,
  },
});
