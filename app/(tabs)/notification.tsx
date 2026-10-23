import { ThemedText } from "@/components/ui/themed-text";
import Header from "@/components/ui/top-header";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/globalStyles";
import { Spacing } from "@/constants/styles";
import {
  ArrowRightLeft,
  CheckCircle2,
  Heart,
  MessageSquare,
  Sparkles,
} from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    icon: <ArrowRightLeft size={20} color={Colors.light.primary} />,
    title: "New Switch Up Offer!",
    body: "Hamza offered a trade proposal for your Apple iPhone 15 Pro Max.",
    time: "10m ago",
    unread: true,
  },
  {
    id: "2",
    icon: <Heart size={20} color={Colors.light.destructive} />,
    title: "New Like on your Listing",
    body: "Zainab and 3 others liked your Sony PlayStation 5 listing.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    icon: <CheckCircle2 size={20} color={Colors.light.success} />,
    title: "Listing Approved",
    body: "Your item is verified and live on the Pakistan marketplace.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    icon: <Sparkles size={20} color={Colors.light.secondary} />,
    title: "Welcome to Switch Up Pakistan!",
    body: "Start exploring trades across Islamabad, Lahore, Karachi, and Peshawar.",
    time: "2d ago",
    unread: false,
  },
];

export default function Notification() {
  return (
    <SafeAreaView style={globalStyles.safeArea} edges={["top"]}>
      <Header text="Notifications" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.list}>
          {NOTIFICATIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemCard,
                item.unread && styles.itemCardUnread,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>{item.icon}</View>
              <View style={styles.textContainer}>
                <View style={styles.topRow}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={[styles.itemTitle, item.unread && styles.unreadTitle]}
                  >
                    {item.title}
                  </ThemedText>
                  <ThemedText style={styles.timeText}>{item.time}</ThemedText>
                </View>
                <ThemedText style={styles.bodyText}>{item.body}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 40,
  },
  list: {
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.light.border,
    gap: 12,
  },
  itemCardUnread: {
    backgroundColor: Colors.light.backgroundLight,
    borderColor: Colors.light.primary,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 14,
  },
  unreadTitle: {
    color: Colors.light.primary,
    fontWeight: "700",
  },
  timeText: {
    fontSize: 11,
    color: Colors.light.gray,
  },
  bodyText: {
    fontSize: 13,
    color: Colors.light.gray,
    lineHeight: 18,
  },
});