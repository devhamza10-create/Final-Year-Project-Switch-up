import ThemedButton from "@/components/ui/themed-button";
import ThemedScrollView from "@/components/ui/themed-scrollview";
import { ThemedText } from "@/components/ui/themed-text";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import useProfileStore from "@/store/profile-store";
import { useRouter } from "expo-router";
import {
  Bell,
  CheckCircle,
  HelpCircle,
  Info,
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react-native";
import React from "react";
import { Alert, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Setting() {
  const router = useRouter();
  const { profile, resetProfile } = useProfileStore();

  const handleLogout = () => {
    const doLogout = () => {
      resetProfile();
      router.push("/(auth)/login");
    };

    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to log out of Switch Up?")) {
        doLogout();
      }
    } else {
      Alert.alert("Log Out", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: doLogout },
      ]);
    }
  };

  return (
    <ThemedScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Account Info Section */}
      <ThemedText type="defaultSemiBold" style={styles.sectionHeader}>
        Personal Account Information
      </ThemedText>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <View style={styles.labelCol}>
            <User size={15} color={Colors.light.gray} />
            <ThemedText style={styles.labelText}>Full Name</ThemedText>
          </View>
          <ThemedText style={styles.valueText}>{profile.fullName}</ThemedText>
        </View>

        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <View style={styles.labelCol}>
            <Mail size={15} color={Colors.light.gray} />
            <ThemedText style={styles.labelText}>Email Address</ThemedText>
          </View>
          <ThemedText style={styles.valueText}>{profile.email}</ThemedText>
        </View>

        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <View style={styles.labelCol}>
            <Phone size={15} color={Colors.light.gray} />
            <ThemedText style={styles.labelText}>Phone Number</ThemedText>
          </View>
          <ThemedText style={styles.valueText}>{profile.phoneNumber}</ThemedText>
        </View>

        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <View style={styles.labelCol}>
            <MapPin size={15} color={Colors.light.gray} />
            <ThemedText style={styles.labelText}>Location</ThemedText>
          </View>
          <ThemedText style={styles.valueText}>{profile.location}</ThemedText>
        </View>

        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <View style={styles.labelCol}>
            <ShieldCheck size={15} color={Colors.light.success} />
            <ThemedText style={styles.labelText}>ID Verification</ThemedText>
          </View>
          <View style={styles.verifiedPill}>
            <CheckCircle size={13} color={Colors.light.success} />
            <ThemedText style={styles.verifiedPillText}>Verified</ThemedText>
          </View>
        </View>
      </View>

      {/* Project & App Info */}
      <ThemedText type="defaultSemiBold" style={styles.sectionHeader}>
        Final Year Project Info
      </ThemedText>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <View style={styles.labelCol}>
            <Info size={15} color={Colors.light.gray} />
            <ThemedText style={styles.labelText}>Application</ThemedText>
          </View>
          <ThemedText style={styles.valueText}>Switch Up Marketplace</ThemedText>
        </View>

        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <View style={styles.labelCol}>
            <HelpCircle size={15} color={Colors.light.gray} />
            <ThemedText style={styles.labelText}>Purpose</ThemedText>
          </View>
          <ThemedText style={styles.valueText}>P2P Barter & Trade System</ThemedText>
        </View>

        <View style={styles.rowDivider} />

        <View style={styles.infoRow}>
          <View style={styles.labelCol}>
            <Info size={15} color={Colors.light.gray} />
            <ThemedText style={styles.labelText}>Version</ThemedText>
          </View>
          <ThemedText style={styles.valueText}>1.0.0 (Expo SDK 53)</ThemedText>
        </View>
      </View>

      {/* Logout Action */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <LogOut size={18} color={Colors.light.destructive} />
        <ThemedText style={styles.logoutText}>Log Out from Account</ThemedText>
      </TouchableOpacity>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 40,
    gap: Spacing.sm,
  },
  sectionHeader: {
    fontSize: 15,
    marginTop: 6,
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  labelCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  labelText: {
    fontSize: 13,
    color: Colors.light.gray,
  },
  valueText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.text,
  },
  rowDivider: {
    height: 0.5,
    backgroundColor: Colors.light.border,
  },
  verifiedPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.light.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  verifiedPillText: {
    fontSize: 11,
    color: Colors.light.success,
    fontWeight: "700",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.destructive,
    backgroundColor: Colors.light.destructiveLight,
  },
  logoutText: {
    color: Colors.light.destructive,
    fontWeight: "700",
    fontSize: 14,
  },
});
