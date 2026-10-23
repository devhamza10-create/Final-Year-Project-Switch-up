import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { View } from "react-native";
import FileInput from "../ui/file-input";
import ThemedInput from "../ui/themed-input";
import { ThemedText } from "../ui/themed-text";
export default function InfoForm() {
  const [idCardFront, setIdCardFront] = useState<ImagePicker.ImagePickerAsset | null>(null);
  return (
    <View style={{ gap: Spacing.md }}>
      <View style={globalStyles.inputContainer}>
        <ThemedText>Email</ThemedText>
        <ThemedInput
          placeholder="sudais@switchup.pk"
          placeholderTextColor={Colors.light.textLight}
        />
      </View>
      <View style={globalStyles.inputContainer}>
        <ThemedText>Full Name</ThemedText>
        <ThemedInput
          placeholder="Sudais"
          placeholderTextColor={Colors.light.textLight}
        />
      </View>
      <View style={globalStyles.inputContainer}>
        <ThemedText>Phone Number</ThemedText>
        <ThemedInput
          placeholder="+92 300 1234567"
          placeholderTextColor={Colors.light.textLight}
          keyboardType="phone-pad"
        />
      </View>
      <View style={globalStyles.inputContainer}>
        <ThemedText>Password</ThemedText>
        <ThemedInput
          placeholderTextColor={Colors.light.textLight}
          type="password"
          placeholder="Enter Password"
          secureTextEntry={true}
        />
      </View>
      <View style={globalStyles.inputContainer}>
        <ThemedText>ID Card (Front Copy)</ThemedText>
        <FileInput
          value={idCardFront}
          onDocumentPicked={(documents) => {
            setIdCardFront(documents);
          }}
          onDocumentRemoved={() => setIdCardFront(null)}
        />
      </View>
    </View>
  );
}
