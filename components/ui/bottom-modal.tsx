import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type BottomModalProps = {
  visible: boolean;
  onClose: () => void;
  lightColor?: string;
  darkColor?: string;
  children: React.ReactNode;
  height?: string;
  modalStyle?: StyleProp<ViewStyle>;
};

export default function BottomModal({
  visible,
  onClose,
  lightColor,
  darkColor,
  children,
  height = "25%",
  modalStyle,
}: BottomModalProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modal}>
        <Pressable style={styles.closeButton} onPress={onClose} />
        <View
          style={[
            styles.modalContent,
            { backgroundColor: color },
            { height: height as any },
            modalStyle,
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
  },
  closeButton: {
    width: "100%",
    height: "100%",
  },
});
