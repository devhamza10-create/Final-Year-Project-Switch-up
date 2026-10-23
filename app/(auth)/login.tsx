import ThemedButton from "@/components/ui/themed-button";
import ThemedInput from "@/components/ui/themed-input";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import useProfileStore from "@/store/profile-store";
import { useRouter } from "expo-router";
import { ArrowRightLeft, Lock, Mail, Sparkles } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const { profile } = useProfileStore();

  const [email, setEmail] = useState("sudais@switchup.pk");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      const msg = "Please enter your email address.";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Missing Email", msg);
      return;
    }

    if (!password.trim()) {
      const msg = "Please enter your password.";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Missing Password", msg);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(tabs)/home");
    }, 400);
  };

  const handleQuickDemo = () => {
    setEmail("sudais@switchup.pk");
    setPassword("password123");
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
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
              Peer-to-Peer Barter & Trade Marketplace
            </ThemedText>
          </View>

          {/* Segmented Auth Selector: Login vs Register */}
          <View style={styles.authSegment}>
            <TouchableOpacity
              style={[styles.segmentTab, styles.segmentTabActive]}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.segmentTextActive}>Login</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.segmentTab}
              onPress={() => router.push("/(auth)/register")}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.segmentTextInactive}>Register</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <ThemedText type="subtitle" style={{ textAlign: "center", marginBottom: 4 }}>
              Welcome Back!
            </ThemedText>
            <ThemedText
              style={{
                textAlign: "center",
                color: Colors.light.gray,
                fontSize: 13,
                marginBottom: 16,
              }}
            >
              Log in to manage your listings and switch offers
            </ThemedText>

            {/* Email Input */}
            <View style={globalStyles.inputContainer}>
              <View style={styles.labelRow}>
                <Mail size={15} color={Colors.light.primary} />
                <ThemedText required>Email Address</ThemedText>
              </View>
              <ThemedInput
                placeholder="you@example.com"
                placeholderTextColor={Colors.light.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={[globalStyles.inputContainer, { marginTop: 12 }]}>
              <View style={styles.labelRow}>
                <Lock size={15} color={Colors.light.primary} />
                <ThemedText required>Password</ThemedText>
              </View>
              <ThemedInput
                placeholder="Enter Password"
                placeholderTextColor={Colors.light.textLight}
                type="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            {/* Login Action */}
            <ThemedButton
              text={loading ? "Authenticating..." : "Login to Switch Up"}
              disabled={loading}
              textLightColor={Colors.light.white}
              textDarkColor={Colors.light.white}
              buttonStyle={styles.loginBtn}
              onPress={handleLogin}
            />

            {/* Quick Demo Access (For Presentation) */}
            <TouchableOpacity
              style={styles.demoBtn}
              onPress={handleQuickDemo}
              activeOpacity={0.7}
            >
              <Sparkles size={16} color={Colors.light.primary} />
              <ThemedText style={styles.demoBtnText}>
                Quick Demo Login (Final Year Project)
              </ThemedText>
            </TouchableOpacity>

            {/* Switch to Register Link */}
            <View style={styles.registerLinkRow}>
              <ThemedText style={{ fontSize: 14, color: Colors.light.gray }}>
                Don't have an account?{" "}
              </ThemedText>
              <Pressable onPress={() => router.push("/(auth)/register")}>
                <ThemedText style={styles.registerHighlight}>
                  Register Here
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  brandTitle: {
    fontSize: 24,
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
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  loginBtn: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
  },
  demoBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.backgroundLight,
  },
  demoBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.primary,
  },
  registerLinkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  registerHighlight: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.primary,
    textDecorationLine: "underline",
  },
});
