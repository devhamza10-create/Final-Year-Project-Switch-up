import { ImagePickerAsset } from "expo-image-picker";
import { create } from "zustand";

export interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImageUri: string;
  idCardUri?: string;
  memberSince: string;
  location: string;
  bio: string;
  tradesCompleted: number;
  rating: number;
  isIdVerified: boolean;
}

interface ProfileStore {
  profile: UserProfile;
  profileImage: ImagePickerAsset | null;
  setProfileImage: (image: ImagePickerAsset) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  fullName: "Sudais",
  email: "sudais@switchup.pk",
  phoneNumber: "+92 300 1234567",
  profileImageUri:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
  memberSince: "August 2024",
  location: "Islamabad, Pakistan",
  bio: "Tech enthusiast & trader from Islamabad, Pakistan. Let's switch up what we have for what we need! 🇵🇰",
  tradesCompleted: 14,
  rating: 4.9,
  isIdVerified: true,
};

const useProfileStore = create<ProfileStore>((set) => ({
  profile: DEFAULT_PROFILE,
  profileImage: null,

  setProfileImage: (image) =>
    set((state) => ({
      profileImage: image,
      profile: {
        ...state.profile,
        profileImageUri: image.uri,
      },
    })),

  updateProfile: (data) =>
    set((state) => ({
      profile: {
        ...state.profile,
        ...data,
      },
    })),

  resetProfile: () =>
    set({
      profile: DEFAULT_PROFILE,
      profileImage: null,
    }),
}));

export default useProfileStore;
