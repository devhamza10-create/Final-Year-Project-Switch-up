import BottomModal from "@/components/ui/bottom-modal";
import FileInput from "@/components/ui/file-input";
import ThemedButton from "@/components/ui/themed-button";
import ThemedInput from "@/components/ui/themed-input";
import ThemedScrollView from "@/components/ui/themed-scrollview";
import { ThemedText } from "@/components/ui/themed-text";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { FontSize, Spacing } from "@/constants/styles";
import useProfileStore from "@/store/profile-store";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ImagePickerAsset, launchImageLibraryAsync } from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  ArrowRightLeft,
  Camera,
  CameraIcon,
  Check,
  CheckCircle,
  FileText,
  ImageIcon,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();
  const { profileImage, setProfileImage, updateProfile } = useProfileStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("Islamabad, Pakistan");
  const [password, setPassword] = useState("");
  const [idCardDoc, setIdCardDoc] = useState<ImagePickerAsset | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  function handleImageUpload(type: "camera" | "gallery") {
    setModalVisible(false);
    if (type === "camera") {
      router.push("/camera");
    } else {
      pickDocument();
    }
  }

  const pickDocument = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets?.[0]) {
        setProfileImage(result.assets[0]);
      }
    } catch (error) {
      console.log("Image picker error:", error);
    }
  };

  const handleRegister = () => {
    if (!fullName.trim()) {
      const msg = "Please enter your Full Name.";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Missing Name", msg);
      return;
    }

    if (!email.trim()) {
      const msg = "Please enter your Email address.";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Missing Email", msg);
      return;
    }

    if (!password.trim()) {
      const msg = "Please create a password.";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Missing Password", msg);
      return;
    }

    setIsSubmitting(true);

    // Save profile into store
    updateProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim() || "+92 300 1234567",
      location: location.trim() || "Islamabad, Pakistan",
      profileImageUri:
        profileImage?.uri ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      isIdVerified: idCardDoc ? true : false,
      memberSince: "Just registered",
    });

    setSuccessMsg(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/(tabs)/home");
    }, 700);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ThemedScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Brand Header */}
          <View style={styles.topContainer}>
            <View style={styles.logoBadge}>
              <ArrowRightLeft size={36} color="#fff" />
            </View>
            <ThemedText style={styles.brandTitle}>SWITCH UP</ThemedText>
            <ThemedText style={styles.brandSubtitle}>
              Create your account to start trading & switching
            </ThemedText>
          </View>

          {/* Segmented Auth Selector: Login vs Register */}
          <View style={styles.authSegment}>
            <TouchableOpacity
              style={styles.segmentTab}
              onPress={() => router.push("/(auth)/login")}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.segmentTextInactive}>Login</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.segmentTab, styles.segmentTabActive]}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.segmentTextActive}>Register</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Success Notification */}
          {successMsg && (
            <View style={styles.successBanner}>
              <Check size={20} color="#fff" />
              <ThemedText style={{ color: "#fff", fontWeight: "600" }}>
                Account created successfully! Taking you inside...
              </ThemedText>
            </View>
          )}

          {/* Registration Form Card */}
          <View style={styles.formCard}>
            {/* Profile Avatar Picker */}
            <View style={styles.avatarSection}>
              <Pressable style={styles.imageContainer} onPress={toggleModal}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage.uri }}
                    style={styles.avatarImg}
                  />
                ) : (
                  <FontAwesome name="user-circle" size={88} color="#d1d5db" />
                )}
                <View style={styles.imageContainerPlus}>
                  <Camera size={18} color="#fff" />
                </View>
              </Pressable>
              <ThemedText style={styles.avatarHint}>
                {profileImage ? "Tap to change photo" : "Tap to add profile photo (Camera / Gallery)"}
              </ThemedText>
            </View>

            {/* Full Name */}
            <View style={globalStyles.inputContainer}>
              <View style={styles.labelRow}>
                <User size={15} color={Colors.light.primary} />
                <ThemedText required>Full Name</ThemedText>
              </View>
              <ThemedInput
                placeholder="e.g. Sudais"
                placeholderTextColor={Colors.light.textLight}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email */}
            <View style={[globalStyles.inputContainer, { marginTop: 12 }]}>
              <View style={styles.labelRow}>
                <Mail size={15} color={Colors.light.primary} />
                <ThemedText required>Email Address</ThemedText>
              </View>
              <ThemedInput
                placeholder="sudais@switchup.pk"
                placeholderTextColor={Colors.light.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone Number */}
            <View style={[globalStyles.inputContainer, { marginTop: 12 }]}>
              <View style={styles.labelRow}>
                <Phone size={15} color={Colors.light.primary} />
                <ThemedText>Phone Number</ThemedText>
              </View>
              <ThemedInput
                placeholder="+92 300 1234567"
                placeholderTextColor={Colors.light.textLight}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>

            {/* Location */}
            <View style={[globalStyles.inputContainer, { marginTop: 12 }]}>
              <View style={styles.labelRow}>
                <MapPin size={15} color={Colors.light.primary} />
                <ThemedText>Location / City</ThemedText>
              </View>
              <ThemedInput
                placeholder="e.g. Islamabad, Pakistan"
                placeholderTextColor={Colors.light.textLight}
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {/* Password */}
            <View style={[globalStyles.inputContainer, { marginTop: 12 }]}>
              <View style={styles.labelRow}>
                <Lock size={15} color={Colors.light.primary} />
                <ThemedText required>Password</ThemedText>
              </View>
              <ThemedInput
                placeholder="Create a secure password"
                placeholderTextColor={Colors.light.textLight}
                type="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            {/* ID Card Verification (Trust & Safety for FYP) */}
            <View style={[globalStyles.inputContainer, { marginTop: 14 }]}>
              <View style={styles.labelRow}>
                <ShieldCheck size={16} color={Colors.light.success} />
                <ThemedText>ID Card / Student ID Verification (Optional)</ThemedText>
              </View>
              <ThemedText style={{ fontSize: 12, color: Colors.light.gray }}>
                Upload ID front to receive a "Verified Trader" badge.
              </ThemedText>
              <FileInput
                value={idCardDoc}
                onDocumentPicked={(doc) => setIdCardDoc(doc)}
                onDocumentRemoved={() => setIdCardDoc(null)}
              />
            </View>

            {/* Register Action Button */}
            <ThemedButton
              text={isSubmitting ? "Creating Account..." : "Complete Registration"}
              disabled={isSubmitting}
              textLightColor={Colors.light.white}
              textDarkColor={Colors.light.white}
              buttonStyle={styles.registerBtn}
              onPress={handleRegister}
            />

            {/* Switch to Login Link */}
            <View style={styles.loginLinkRow}>
              <ThemedText style={{ fontSize: 14, color: Colors.light.gray }}>
                Already have an account?{" "}
              </ThemedText>
              <Pressable onPress={() => router.push("/(auth)/login")}>
                <ThemedText style={styles.loginHighlight}>Login Now</ThemedText>
              </Pressable>
            </View>
          </View>
        </ThemedScrollView>
      </KeyboardAvoidingView>

      {/* Image Upload Source Modal */}
      <BottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        height="26%"
        modalStyle={styles.bottomModalStyle}
      >
        <View style={styles.modalContent}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 6 }}>
            Select Profile Photo
          </ThemedText>

          <TouchableOpacity
            onPress={() => handleImageUpload("camera")}
            style={styles.modalOption}
          >
            <View style={styles.modalOptionIconCircle}>
              <CameraIcon size={20} color="#fff" />
            </View>
            <ThemedText style={styles.modalOptionText}>
              Take Photo with Camera
            </ThemedText>
          </TouchableOpacity>

          <View style={styles.modalDivider} />

          <TouchableOpacity
            onPress={() => handleImageUpload("gallery")}
            style={styles.modalOption}
          >
            <View style={[styles.modalOptionIconCircle, { backgroundColor: Colors.light.secondary }]}>
              <ImageIcon size={20} color="#fff" />
            </View>
            <ThemedText style={styles.modalOptionText}>
              Choose from Photo Gallery
            </ThemedText>
          </TouchableOpacity>
        </View>
      </BottomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 50,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
    color: Colors.light.primary,
  },
  brandSubtitle: {
    fontSize: 13,
    color: Colors.light.gray,
    marginTop: 4,
    textAlign: "center",
  },
  authSegment: {
    flexDirection: "row",
    backgroundColor: Colors.light.backgroundLight,
    borderRadius: 12,
    padding: 4,
    marginBottom: Spacing.md,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  segmentTabActive: {
    backgroundColor: Colors.light.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  segmentTextInactive: {
    color: Colors.light.gray,
    fontWeight: "600",
    fontSize: 14,
  },
  successBanner: {
    backgroundColor: Colors.light.success,
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  imageContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#f9fafb",
  },
  avatarImg: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  imageContainerPlus: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  avatarHint: {
    fontSize: 12,
    color: Colors.light.gray,
    marginTop: 8,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  registerBtn: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
  },
  loginLinkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  loginHighlight: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.primary,
    textDecorationLine: "underline",
  },
  bottomModalStyle: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  modalContent: {
    padding: Spacing.md,
    gap: 10,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  modalOptionIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 15,
    fontWeight: "600",
  },
  modalDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
  },
});
