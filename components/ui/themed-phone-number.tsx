import countries from "@/assets/countries.json";
import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/styles";
import useDebounce from "@/hooks/useDebounce";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import BottomModal from "./bottom-modal";
import ThemedInput from "./themed-input";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export type Country = {
  name: string;
  code: string;
  countryCode: string;
  phoneFormat: string;
  phoneLength: number;
  flag: string;
};

type ThemedPhoneNumberProps = {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
};

const countryList: Country[] = countries as Country[];

export default function ThemedPhoneNumber({
  phoneNumber,
  setPhoneNumber,
}: ThemedPhoneNumberProps) {
  const defaultCountry = countryList.find((country) => country.code === "PK") || countryList[0];
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    defaultCountry
  );
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  const flagContaierBg = useThemeColor(
    { light: Colors.light.backgroundLight, dark: Colors.dark.backgroundLight },
    "background"
  );
  return (
    <>
      <ThemedView style={styles.container}>
        <Pressable
          onPress={toggleModal}
          style={[styles.flagContainer, { backgroundColor: flagContaierBg }]}
        >
          <Image
            source={{ uri: selectedCountry?.flag }}
            style={styles.flagImage}
          />
          <ChevronDown size={24} color={Colors.dark.gray} />
        </Pressable>
        <View style={{ flexDirection: "row", flexShrink: 1 }}>
          <ThemedView
            lightColor={Colors.light.backgroundLight}
            darkColor={Colors.dark.backgroundLight}
            style={styles.countryCodeContainer}
          >
            <ThemedText>{selectedCountry?.countryCode}</ThemedText>
          </ThemedView>
          <ThemedInput
            placeholderTextColor={Colors.light.textLight}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.gray}
            containerStyle={styles.input}
            inputStyle={{ fontSize: FontSize.md }}
            placeholder={selectedCountry?.phoneFormat}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            inputMode="numeric"
            maxLength={selectedCountry?.phoneLength}
          />
        </View>
      </ThemedView>

      {/* Countries Modal */}
      <BottomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        height="70%"
      >
        <ThemedView>
          <ThemedInput
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            containerStyle={styles.searchInput}
          />
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <RenderItem
                item={item}
                setSelectedCountry={setSelectedCountry}
                toggleModal={toggleModal}
              />
            )}
          />
        </ThemedView>
      </BottomModal>
    </>
  );

  function RenderItem({
    item,
    setSelectedCountry,
    toggleModal,
  }: {
    item: Country;
    setSelectedCountry: (country: Country) => void;
    toggleModal: () => void;
  }) {
    return (
      <Pressable
        style={styles.row}
        key={item.code}
        onPress={() => {
          setSelectedCountry(item);
          toggleModal();
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: Spacing.md,
          }}
        >
          <ThemedText type="sm">{item.countryCode}</ThemedText>
          <ThemedText type="sm">{item.name}</ThemedText>
        </View>
        <Image source={{ uri: item.flag }} style={styles.flagImage} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    height: 52,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.xs,
  },
  flagImage: {
    width: 48,
    height: 24,
    borderRadius: Spacing.xs,
  },
  input: {
    flexShrink: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.dark.gray,
  },
  countryCodeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.xs,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  searchInput: {
    borderColor: Colors.dark.gray,
  },
});
