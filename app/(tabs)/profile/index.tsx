import ThemedButton from "@/components/ui/themed-button";
import ThemedScrollView from "@/components/ui/themed-scrollview";
import { ThemedText } from "@/components/ui/themed-text";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import useListingStore from "@/store/listing-store";
import useProfileStore from "@/store/profile-store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ArrowRightLeft,
  CheckCircle2,
  List,
  MapPin,
  Plus,
  Settings,
  ShieldCheck,
  Star,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const { profile } = useProfileStore();
  const { listings } = useListingStore();

  const myListingsCount = listings.filter((l) => l.isMine).length;

  return (
    <ThemedScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Profile Header Card */}
      <View style={styles.profileHeaderCard}>
        {/* Avatar with Verified Badge */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: profile.profileImageUri }}
            style={styles.avatar}
          />
          {profile.isIdVerified && (
            <View style={styles.verifiedBadge}>
              <CheckCircle2 size={16} color="#fff" />
            </View>
          )}
        </View>

        <ThemedText type="subtitle" style={styles.userName}>
          {profile.fullName}
        </ThemedText>

        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.light.gray} />
          <ThemedText style={styles.locationText}>{profile.location}</ThemedText>
        </View>

        {profile.isIdVerified && (
          <View style={styles.trustBadge}>
            <ShieldCheck size={14} color={Colors.light.success} />
            <ThemedText style={styles.trustBadgeText}>
              Government ID Verified Trader
            </ThemedText>
          </View>
        )}

        <ThemedText style={styles.bioText}>{profile.bio}</ThemedText>

        <ThemedText style={styles.memberSinceText}>
          Member since {profile.memberSince}
        </ThemedText>
      </View>

      {/* Trade Stats Counters */}
      <View style={styles.statsCard}>
        <View style={styles.statCol}>
          <ThemedText style={styles.statNumber}>
            {profile.tradesCompleted}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Switches Done</ThemedText>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statCol}>
          <ThemedText style={styles.statNumber}>{myListingsCount}</ThemedText>
          <ThemedText style={styles.statLabel}>My Listings</ThemedText>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statCol}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Star size={16} color={Colors.light.primary} fill={Colors.light.primary} />
            <ThemedText style={styles.statNumber}>{profile.rating}</ThemedText>
          </View>
          <ThemedText style={styles.statLabel}>Rating</ThemedText>
        </View>
      </View>

      {/* Quick Action Shortcuts */}
      <View style={styles.actionsSection}>
        <ThemedText type="defaultSemiBold" style={{ marginBottom: 4 }}>
          Account Quick Actions
        </ThemedText>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/(tabs)/new-listing")}
        >
          <View style={[styles.actionIconCircle, { backgroundColor: Colors.light.primary }]}>
            <Plus size={18} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.actionBtnTitle}>Create New Listing</ThemedText>
            <ThemedText style={styles.actionBtnDesc}>List gear to swap or barter</ThemedText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/(tabs)/listings")}
        >
          <View style={[styles.actionIconCircle, { backgroundColor: Colors.light.secondary }]}>
            <List size={18} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.actionBtnTitle}>Manage My Listings</ThemedText>
            <ThemedText style={styles.actionBtnDesc}>
              {myListingsCount} active items posted
            </ThemedText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/(tabs)/home")}
        >
          <View style={[styles.actionIconCircle, { backgroundColor: Colors.light.primaryDark }]}>
            <ArrowRightLeft size={18} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.actionBtnTitle}>Browse Marketplace</ThemedText>
            <ThemedText style={styles.actionBtnDesc}>Explore trades in your area</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 40,
    gap: Spacing.md,
  },
  profileHeaderCard: {
    alignItems: "center",
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
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: Colors.light.primary,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: Colors.light.success,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13,
    color: Colors.light.gray,
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.light.successLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  trustBadgeText: {
    fontSize: 12,
    color: Colors.light.success,
    fontWeight: "700",
  },
  bioText: {
    fontSize: 13,
    color: Colors.light.text,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  memberSinceText: {
    fontSize: 11,
    color: Colors.light.gray,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  statCol: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.light.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.gray,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
    height: "70%",
    alignSelf: "center",
  },
  actionsSection: {
    gap: 10,
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  actionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionBtnDesc: {
    fontSize: 12,
    color: Colors.light.gray,
    marginTop: 2,
  },
});
