import FileInput from "@/components/ui/file-input";
import ThemedButton from "@/components/ui/themed-button";
import ThemedInput from "@/components/ui/themed-input";
import ThemedScrollView from "@/components/ui/themed-scrollview";
import { ThemedText } from "@/components/ui/themed-text";
import ThemedTextarea from "@/components/ui/themed-textarea";
import Header from "@/components/ui/top-header";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import useListingStore from "@/store/listing-store";
import { ImagePickerAsset } from "expo-image-picker";
import { useRouter } from "expo-router";
import { Check, Sparkles } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  "Electronics",
  "Gaming",
  "Fashion",
  "Sports",
  "Vehicles",
  "Home",
  "Others",
];

const CONDITIONS = ["Brand New", "Like New", "Good", "Fair"];

export default function AddNewListing() {
  const router = useRouter();
  const { addListing } = useListingStore();

  const [photo, setPhoto] = useState<ImagePickerAsset | null>(null);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [selectedCondition, setSelectedCondition] = useState("Like New");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleAddListing = () => {
    if (!title.trim()) {
      const msg = "Please enter an eye-catching title for your item.";
      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Missing Title", msg);
      }
      return;
    }

    if (!value.trim()) {
      const msg = "Please specify the estimated value or trade price.";
      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Missing Value", msg);
      }
      return;
    }

    setIsSubmitting(true);

    addListing({
      title: title.trim(),
      value: value.trim(),
      location: location.trim() || "Islamabad, Pakistan",
      description: description.trim() || "Open to trade / switch offers.",
      photoUri: photo?.uri,
      category: selectedCategory,
      condition: selectedCondition,
    });

    setSuccessMsg(true);

    setTimeout(() => {
      // Reset form
      setPhoto(null);
      setTitle("");
      setValue("");
      setLocation("");
      setDescription("");
      setIsSubmitting(false);
      setSuccessMsg(false);
      // Navigate to Listings tab so the user sees their new listing
      router.push("/(tabs)/listings");
    }, 600);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Header text="Add New Listing" />
      <ThemedScrollView
        contentContainerStyle={{
          gap: Spacing.md,
          paddingHorizontal: Spacing.lg,
          paddingBottom: Spacing.lg * 2,
        }}
      >
        {successMsg && (
          <View style={styles.successBanner}>
            <Check size={20} color="#fff" />
            <ThemedText style={{ color: "#fff", fontWeight: "600" }}>
              Listing published successfully! Redirecting...
            </ThemedText>
          </View>
        )}

        {/* Photo Upload */}
        <View style={globalStyles.inputContainer}>
          <ThemedText required>Photo</ThemedText>
          <FileInput
            value={photo}
            onDocumentPicked={(document) => setPhoto(document)}
            onDocumentRemoved={() => setPhoto(null)}
          />
        </View>

        {/* Title */}
        <View style={globalStyles.inputContainer}>
          <ThemedText required>Title</ThemedText>
          <ThemedInput
            placeholder="✨ Eye-catching title for your item"
            placeholderTextColor={Colors.light.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Category Selector */}
        <View style={globalStyles.inputContainer}>
          <ThemedText>Category</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.chip,
                    isSelected ? styles.chipSelected : styles.chipUnselected,
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {cat}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Estimated Value */}
        <View style={globalStyles.inputContainer}>
          <ThemedText required>Estimated Value / Price</ThemedText>
          <ThemedInput
            placeholder="💰 e.g. Rs. 85,000 or Trade Value"
            placeholderTextColor={Colors.light.textLight}
            value={value}
            onChangeText={setValue}
          />
        </View>

        {/* Condition */}
        <View style={globalStyles.inputContainer}>
          <ThemedText>Condition</ThemedText>
          <View style={styles.conditionRow}>
            {CONDITIONS.map((cond) => {
              const isSelected = selectedCondition === cond;
              return (
                <Pressable
                  key={cond}
                  onPress={() => setSelectedCondition(cond)}
                  style={[
                    styles.conditionButton,
                    isSelected && styles.conditionButtonSelected,
                  ]}
                >
                  <ThemedText
                    type="sm"
                    style={[
                      styles.conditionText,
                      isSelected && styles.conditionTextSelected,
                    ]}
                  >
                    {cond}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Location */}
        <View style={globalStyles.inputContainer}>
          <ThemedText>Location</ThemedText>
          <ThemedInput
            placeholder="📍 City or area (e.g. F-7 Islamabad, Gulberg Lahore)"
            placeholderTextColor={Colors.light.textLight}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Description */}
        <View style={globalStyles.inputContainer}>
          <ThemedText>Description & Swap Preference</ThemedText>
          <ThemedTextarea
            placeholder="📝 Describe item condition, reason for trade, and what you want to switch for"
            placeholderTextColor={Colors.light.textLight}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Submit Button */}
        <ThemedButton
          text={isSubmitting ? "Publishing..." : "Add Listing"}
          disabled={isSubmitting}
          onPress={handleAddListing}
          textLightColor={Colors.light.white}
          textDarkColor={Colors.light.white}
          buttonStyle={styles.submitButton}
        />
      </ThemedScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  successBanner: {
    backgroundColor: Colors.light.success,
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipUnselected: {
    borderColor: Colors.light.border,
    backgroundColor: "transparent",
  },
  chipSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary,
  },
  chipText: {
    fontSize: 13,
    color: Colors.light.text,
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  conditionRow: {
    flexDirection: "row",
    gap: 8,
  },
  conditionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: "center",
  },
  conditionButtonSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.backgroundLight,
  },
  conditionText: {
    color: Colors.light.text,
  },
  conditionTextSelected: {
    color: Colors.light.primary,
    fontWeight: "600",
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
  },
});
