import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import useListingStore, { ListingItem } from "@/store/listing-store";
import useProfileStore from "@/store/profile-store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ArrowRightLeft,
  Bell,
  Heart,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Tag,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  "All",
  "Electronics",
  "Gaming",
  "Fashion",
  "Sports",
  "Vehicles",
];

export default function Home() {
  const router = useRouter();
  const { listings, toggleLike } = useListingStore();
  const { profile } = useProfileStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [listings, searchQuery, activeCategory]);

  const handleProposeSwitch = (item: ListingItem) => {
    const message = `Ready to switch for "${item.title}"? You can offer an item from your listings or cash difference.`;
    if (Platform.OS === "web") {
      window.alert(`🔄 Switch Up Request:\n\n${message}`);
    } else {
      Alert.alert("Switch Up Proposal", message, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Offer",
          onPress: () => Alert.alert("Success", "Switch offer sent to the owner!"),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={["top"]}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Sparkles size={18} color={Colors.light.primary} />
            <ThemedText style={styles.brandTitle}>SWITCH UP</ThemedText>
          </View>
          <ThemedText style={styles.greetingText}>
            Welcome back, {profile.fullName} 👋
          </ThemedText>
        </View>
        <TouchableOpacity
          style={styles.notificationIconBtn}
          onPress={() => router.push("/(tabs)/notification")}
        >
          <Bell size={22} color={Colors.light.text} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.light.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items in Islamabad, Lahore, Karachi..."
            placeholderTextColor={Colors.light.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <ThemedText style={{ color: Colors.light.primary, fontSize: 13 }}>
                Clear
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Hero Promo Banner */}
        <View style={styles.heroBanner}>
          <View style={{ flex: 1 }}>
            <View style={styles.tradeBadge}>
              <ArrowRightLeft size={14} color="#fff" />
              <ThemedText style={styles.tradeBadgeText}>Zero-Fee Trading</ThemedText>
            </View>
            <ThemedText style={styles.heroTitle}>
              Trade Smarter, Switch Up!
            </ThemedText>
            <ThemedText style={styles.heroSubtitle}>
              Swap items you don't use for things you love.
            </ThemedText>
            <TouchableOpacity
              style={styles.heroCtaBtn}
              onPress={() => router.push("/(tabs)/new-listing")}
            >
              <Plus size={16} color="#fff" />
              <ThemedText style={styles.heroCtaText}>List an Item</ThemedText>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&auto=format&fit=crop&q=80",
            }}
            style={styles.heroImage}
          />
        </View>

        {/* Category Pills */}
        <View style={{ marginVertical: Spacing.sm }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  style={[
                    styles.categoryPill,
                    isActive && styles.categoryPillActive,
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.categoryPillText,
                      isActive && styles.categoryPillTextActive,
                    ]}
                  >
                    {cat}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Section Header: Featured Trades */}
        <View style={styles.sectionHeader}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Available for Switch ({filteredListings.length})
          </ThemedText>
          <TouchableOpacity onPress={() => router.push("/(tabs)/listings")}>
            <ThemedText style={styles.viewAllText}>View All</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyTitle}>No items found</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Try adjusting your search or category filter.
            </ThemedText>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => router.push("/(tabs)/new-listing")}
            >
              <ThemedText style={{ color: "#fff", fontWeight: "600" }}>
                Post the First Listing
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.listingGrid}>
            {filteredListings.map((item) => (
              <View key={item.id} style={styles.card}>
                {/* Image & Badges */}
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.photoUri }} style={styles.cardImage} />
                  <View style={styles.categoryTag}>
                    <ThemedText style={styles.categoryTagText}>
                      {item.category}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => toggleLike(item.id)}
                  >
                    <Heart
                      size={18}
                      color={item.isLiked ? Colors.light.destructive : "#fff"}
                      fill={item.isLiked ? Colors.light.destructive : "transparent"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.cardBody}>
                  <View style={styles.priceRow}>
                    <ThemedText style={styles.priceTag}>{item.value}</ThemedText>
                    {item.condition && (
                      <View style={styles.conditionPill}>
                        <ThemedText style={styles.conditionPillText}>
                          {item.condition}
                        </ThemedText>
                      </View>
                    )}
                  </View>

                  <ThemedText
                    type="defaultSemiBold"
                    numberOfLines={2}
                    style={styles.cardTitle}
                  >
                    {item.title}
                  </ThemedText>

                  <View style={styles.locationRow}>
                    <MapPin size={13} color={Colors.light.gray} />
                    <ThemedText numberOfLines={1} style={styles.locationText}>
                      {item.location}
                    </ThemedText>
                  </View>

                  <ThemedText numberOfLines={2} style={styles.descriptionText}>
                    {item.description}
                  </ThemedText>

                  {/* Switch Proposal CTA */}
                  <TouchableOpacity
                    style={styles.switchButton}
                    onPress={() => handleProposeSwitch(item)}
                  >
                    <ArrowRightLeft size={15} color="#fff" />
                    <ThemedText style={styles.switchButtonText}>
                      Switch Up
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.border,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
    color: Colors.light.primary,
  },
  greetingText: {
    fontSize: 13,
    color: Colors.light.gray,
    marginTop: 2,
  },
  notificationIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.destructive,
    position: "absolute",
    top: 10,
    right: 12,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    gap: Spacing.md,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    marginTop: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.text,
  },
  heroBanner: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  tradeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  tradeBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 12,
    lineHeight: 16,
  },
  heroCtaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.light.primaryDark,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  heroCtaText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginLeft: 10,
  },
  categoryScroll: {
    gap: 8,
    paddingVertical: 4,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundLight,
  },
  categoryPillActive: {
    backgroundColor: Colors.light.primary,
  },
  categoryPillText: {
    fontSize: 13,
    color: Colors.light.text,
    fontWeight: "500",
  },
  categoryPillTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
  },
  viewAllText: {
    fontSize: 13,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  listingGrid: {
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imageWrapper: {
    width: "100%",
    height: 190,
    position: "relative",
    backgroundColor: "#f0f0f0",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  categoryTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardBody: {
    padding: 14,
    gap: 6,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceTag: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.light.primary,
  },
  conditionPill: {
    backgroundColor: Colors.light.backgroundLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  conditionPillText: {
    fontSize: 11,
    color: Colors.light.text,
    fontWeight: "600",
  },
  cardTitle: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.light.text,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: Colors.light.gray,
    flex: 1,
  },
  descriptionText: {
    fontSize: 13,
    color: Colors.light.gray,
    lineHeight: 18,
    marginTop: 2,
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.light.primary,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  switchButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.light.gray,
  },
  emptyBtn: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
});