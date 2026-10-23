import { ThemedText } from "@/components/ui/themed-text";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback } from "react";
import { Image, StyleSheet } from "react-native";
import ThemedPressable from "./themed-pressable";

type FileInputProps = {
  onDocumentPicked: (documents: ImagePicker.ImagePickerAsset) => void;
  value: ImagePicker.ImagePickerAsset | null;
  onDocumentRemoved: () => void;
};

export default function FileInput({
  onDocumentPicked,
  value,
  onDocumentRemoved,
}: FileInputProps) {
  const color = useThemeColor(
    { light: Colors.light.primary, dark: Colors.dark.secondary },
    "background"
  );

  const selectedDocument = useCallback(() => {
    if (value) {
      return value?.fileName;
    }
    return null;
  }, [value]);

  const pickDocument = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        onDocumentPicked(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ThemedPressable style={styles.container} onPress={pickDocument}>
        {value ? (
          <Image
            source={{ uri: value.uri }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        ) : (
          <>
            <SimpleLineIcons name="cloud-upload" size={36} color={color} />
            <ThemedText
              lightColor={Colors.light.gray}
              darkColor={Colors.dark.gray}
            >
              Upload your document here
            </ThemedText>
            <ThemedText
              lightColor={Colors.light.gray}
              darkColor={Colors.dark.gray}
              type="xs"
            >
              Supported formats: JPG, PNG
            </ThemedText>
          </>
        )}
      </ThemedPressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDocument: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 10,
    ...globalStyles.rowBetween,
  },
});
