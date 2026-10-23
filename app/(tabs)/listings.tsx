import { ThemedText } from "@/components/ui/themed-text";
import Header from "@/components/ui/top-header";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import useListingStore, { ListingItem } from "@/store/listing-store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ArrowRightLeft,
  Heart,
  MapPin,
  Plus,
  Search,
  Trash2,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Alert,
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

export default function ListingsScreen() {
  const router = useRouter();
  const { listings, toggleLike, deleteListing } = useListingStore();

  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (activeTab === "mine" && !item.isMine) {
        return false;
      }
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [listings, activeTab, searchQuery, selectedCategory]);

  const handleDelete = (id: string, title: string) => {
    const confirmDelete = () => {
      deleteListing(id);
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
        confirmDelete();
      }
    } else {
      Alert.alert(
        "Delete Listing",
        `Are you sure you want to delete "${title}"?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: confirmDelete },
        ]
      );
    }
  };

  const handleProposeSwitch = (item: ListingItem) => {
    const message = `Send a trade proposal for "${item.title}". You can offer one of your items or a trade combination.`;
    if (Platform.OS === "web") {
      window.alert(`🔄 Switch Up Offer:\n\n${message}`);
    } else {
      Alert.alert("Switch Up Proposal", message, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Offer",
          onPress: () =>
            Alert.alert("Offer Sent", "The listing owner has been notified!"),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={["top"]}>
      <Header text="Marketplace Listings" />

      {/* Segmented Control: All vs My Listings */}
      <View style={styles.segmentContainer}>
        <Pressable
          style={[
            styles.segmentButton,
            activeTab === "all" && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab("all")}
        >
          <ThemedText
            style={[
              styles.segmentText,
              activeTab === "all" && styles.segmentTextActive,
            ]}
          >
            All Listings ({listings.length})
          </ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.segmentButton,
            activeTab === "mine" && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab("mine")}
        >
          <ThemedText
            style={[
              styles.segmentText,
              activeTab === "mine" && styles.segmentTextActive,
            ]}
          >
            My Listings ({listings.filter((l) => l.isMine).length})
          </ThemedText>
        </Pressable>
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
            placeholder="Search listings by title, city..."
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

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipActive,
                ]}
              >
                <ThemedText
                  style={[
                    styles.categoryChipText,
                    isSelected && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Listings Content */}
        {filteredListings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyTitle}>
              {activeTab === "mine"
                ? "You haven't listed any items yet"
                : "No matching listings"}
            </ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              {activeTab === "mine"
                ? "Post your unused electronics, fashion, or gear and start switching!"
                : "Try a different search keyword or category filter."}
            </ThemedText>
            <TouchableOpacity
              style={styles.emptyActionBtn}
              onPress={() => router.push("/(tabs)/new-listing")}
            >
              <Plus size={18} color="#fff" />
              <ThemedText style={styles.emptyActionBtnText}>
                Create New Listing
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.listingsList}>
            {filteredListings.map((item) => (
              <View key={item.id} style={styles.listingCard}>
                {/* Photo & Badges */}
                <View style={styles.imageBox}>
                  <Image source={{ uri: item.photoUri }} style={styles.listingImage} />
                  <View style={styles.categoryBadge}>
                    <ThemedText style={styles.categoryBadgeText}>
                      {item.category}
                    </ThemedText>
                  </View>
                  {item.isMine && (
                    <View style={styles.myBadge}>
                      <ThemedText style={styles.myBadgeText}>My Item</ThemedText>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.likeBtn}
                    onPress={() => toggleLike(item.id)}
                  >
                    <Heart
                      size={18}
                      color={item.isLiked ? Colors.light.destructive : "#fff"}
                      fill={item.isLiked ? Colors.light.destructive : "transparent"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Card Details */}
                <View style={styles.detailsBox}>
                  <View style={styles.priceRow}>
                    <ThemedText style={styles.priceValue}>{item.value}</ThemedText>
                    {item.condition && (
                      <View style={styles.conditionTag}>
                        <ThemedText style={styles.conditionTagText}>
                          {item.condition}
                        </ThemedText>
                      </View>
                    )}
                  </View>

                  <ThemedText
                    type="defaultSemiBold"
                    numberOfLines={2}
                    style={styles.itemTitle}
                  >
                    {item.title}
                  </ThemedText>

                  <View style={styles.locationRow}>
                    <MapPin size={13} color={Colors.light.gray} />
                    <ThemedText numberOfLines={1} style={styles.locationText}>
                      {item.location} • {item.createdAt}
                    </ThemedText>
                  </View>

                  <ThemedText numberOfLines={3} style={styles.descText}>
                    {item.description}
                  </ThemedText>

                  {/* Owner & Action */}
                  <View style={styles.cardFooter}>
                    <View style={styles.ownerInfo}>
                      <Image
                        source={{ uri: item.ownerAvatar }}
                        style={styles.avatar}
                      />
                      <ThemedText style={styles.ownerName}>
                        {item.ownerName}
                      </ThemedText>
                    </View>

                    {item.isMine ? (
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleDelete(item.id, item.title)}
                      >
                        <Trash2 size={16} color={Colors.light.destructive} />
                        <ThemedText style={styles.deleteBtnText}>
                          Remove
                        </ThemedText>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.switchBtn}
                        onPress={() => handleProposeSwitch(item)}
                      >
                        <ArrowRightLeft size={14} color="#fff" />
                        <ThemedText style={styles.switchBtnText}>
                          Offer Switch
                        </ThemedText>
                      </TouchableOpacity>
                    )}
                  </View>
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
  segmentContainer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.border,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: Colors.light.backgroundLight,
  },
  segmentButtonActive: {
    backgroundColor: Colors.light.primary,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.text,
  },
  segmentTextActive: {
    color: "#fff",
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
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
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.text,
  },
  categoryScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundLight,
  },
  categoryChipActive: {
    backgroundColor: Colors.light.primary,
  },
  categoryChipText: {
    fontSize: 13,
    color: Colors.light.text,
  },
  categoryChipTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  listingsList: {
    gap: 16,
  },
  listingCard: {
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
  imageBox: {
    width: "100%",
    height: 200,
    position: "relative",
    backgroundColor: "#f2f2f2",
  },
  listingImage: {
    width: "100%",
    height: "100%",
  },
  categoryBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  myBadge: {
    position: "absolute",
    top: 10,
    left: 95,
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  myBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  likeBtn: {
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
  detailsBox: {
    padding: 14,
    gap: 6,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceValue: {
    fontSize: 19,
    fontWeight: "800",
    color: Colors.light.primary,
  },
  conditionTag: {
    backgroundColor: Colors.light.backgroundLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  conditionTagText: {
    fontSize: 11,
    color: Colors.light.text,
    fontWeight: "600",
  },
  itemTitle: {
    fontSize: 16,
    lineHeight: 22,
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
  },
  descText: {
    fontSize: 13,
    color: Colors.light.gray,
    lineHeight: 18,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: Colors.light.border,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  ownerName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.text,
  },
  switchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  switchBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.light.destructive,
  },
  deleteBtnText: {
    color: Colors.light.destructive,
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: "center",
    gap: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.light.gray,
    textAlign: "center",
    maxWidth: 280,
  },
  emptyActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  emptyActionBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});