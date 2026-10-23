import { Colors } from "@/constants/Colors";
import useProfileStore from "@/store/profile-store";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const { setProfileImage } = useProfileStore();
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  // 1. Camera permissions are still loading
  if (!permission) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  // 2. Camera permission is not granted
  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, styles.permissionContainer]}>
        <Ionicons
          name="camera-outline"
          size={64}
          color="#666"
          style={styles.icon}
        />
        <Text style={styles.title}>Camera Access Required</Text>
        <Text style={styles.message}>
          We need access to your camera so you can take and upload a profile photo.
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={requestPermission}
        >
          <Text style={styles.primaryButtonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // 3. Toggle between front and back camera
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // 4. Capture photo and save to profile store
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        if (photo?.uri) {
          setProfileImage(photo as any);
          router.back();
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        {/* Top bar with back button */}
        <SafeAreaView style={styles.topBar}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={26} color="white" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Bottom controls */}
        <View style={styles.bottomBar}>
          {/* Flip camera */}
          <TouchableOpacity
            style={styles.circleButton}
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse-outline" size={28} color="white" />
          </TouchableOpacity>

          {/* Shutter capture button */}
          <TouchableOpacity
            style={styles.shutterOuter}
            onPress={takePicture}
            activeOpacity={0.7}
          >
            <View style={styles.shutterInner} />
          </TouchableOpacity>

          {/* Placeholder for symmetry */}
          <View style={styles.placeholderButton} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "500",
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 40,
    paddingHorizontal: 30,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingTop: 20,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderButton: {
    width: 50,
    height: 50,
  },
  shutterOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
});
