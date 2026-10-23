import { create } from "zustand";

export interface ListingItem {
  id: string;
  title: string;
  value: string;
  location: string;
  description: string;
  photoUri: string;
  category: string;
  condition?: string;
  createdAt: string;
  ownerName: string;
  ownerAvatar: string;
  likes: number;
  isLiked?: boolean;
  isMine?: boolean;
}

interface ListingStore {
  listings: ListingItem[];
  addListing: (listing: {
    title: string;
    value: string;
    location: string;
    description: string;
    photoUri?: string;
    category?: string;
    condition?: string;
  }) => void;
  toggleLike: (id: string) => void;
  deleteListing: (id: string) => void;
}

const INITIAL_LISTINGS: ListingItem[] = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
    value: "Rs. 290,000",
    location: "F-7, Islamabad, Pakistan",
    category: "Electronics",
    condition: "Like New",
    description:
      "PTA Approved. Flawless condition with original box and cable. Battery health 99%. Looking to switch for a high-end gaming laptop (Asus ROG/Legion) or Sony A7 camera gear.",
    photoUri:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    createdAt: "Just now",
    ownerName: "Sudais",
    ownerAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    likes: 18,
    isLiked: false,
    isMine: false,
  },
  {
    id: "2",
    title: "Sony PlayStation 5 Disc Edition + 2 DualSense Controllers",
    value: "Rs. 145,000",
    location: "DHA Phase 5, Lahore, Pakistan",
    category: "Gaming",
    condition: "Excellent",
    description:
      "Includes Spider-Man 2, God of War Ragnarök, charging dock and two controllers. Looking to swap for iPad Pro or an electric bike.",
    photoUri:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
    createdAt: "2 hours ago",
    ownerName: "Hamza R.",
    ownerAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80",
    likes: 29,
    isLiked: true,
    isMine: false,
  },
  {
    id: "3",
    title: "Canon EOS R6 Mirrorless Camera + 24-105mm F4 Lens",
    value: "Rs. 490,000",
    location: "Clifton, Karachi, Pakistan",
    category: "Electronics",
    condition: "Like New",
    description:
      "Shutter count below 5,000. 4K 60fps video capability. Interested in switching for an Apple M2/M3 MacBook Pro or DJI Ronin combo.",
    photoUri:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    createdAt: "5 hours ago",
    ownerName: "Zainab A.",
    ownerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    likes: 42,
    isLiked: false,
    isMine: false,
  },
  {
    id: "4",
    title: "Trek Domane SL5 Carbon Endurance Road Bike",
    value: "Rs. 185,000",
    location: "University Town, Peshawar, Pakistan",
    category: "Sports",
    condition: "Good",
    description:
      "54cm carbon frame, Shimano 105 11-speed groupset, hydraulic disc brakes. Looking to trade for a Mountain Bike or smartphone.",
    photoUri:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80",
    createdAt: "1 day ago",
    ownerName: "Bilal K.",
    ownerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    likes: 15,
    isLiked: false,
    isMine: false,
  },
  {
    id: "5",
    title: "Apple MacBook Pro 14-inch M3 Pro 18GB / 512GB",
    value: "Rs. 420,000",
    location: "Gulberg, Lahore, Pakistan",
    category: "Electronics",
    condition: "Like New",
    description:
      "Space Black, 100% battery capacity. Complete box and 70W power adapter. Looking for high-end camera or trade offers.",
    photoUri:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    createdAt: "2 days ago",
    ownerName: "Usman M.",
    ownerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    likes: 38,
    isLiked: false,
    isMine: false,
  },
];

export const useListingStore = create<ListingStore>((set) => ({
  listings: INITIAL_LISTINGS,

  addListing: (newListing) =>
    set((state) => ({
      listings: [
        {
          id: Date.now().toString(),
          title: newListing.title,
          value: newListing.value.toLowerCase().startsWith("rs")
            ? newListing.value
            : `Rs. ${newListing.value}`,
          location: newListing.location || "Islamabad, Pakistan",
          description: newListing.description || "Open to trade / switch offers.",
          photoUri:
            newListing.photoUri ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
          category: newListing.category || "General",
          condition: newListing.condition || "Good",
          createdAt: "Just now",
          ownerName: "Sudais",
          ownerAvatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
          likes: 0,
          isLiked: false,
          isMine: true,
        },
        ...state.listings,
      ],
    })),

  toggleLike: (id) =>
    set((state) => ({
      listings: state.listings.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      ),
    })),

  deleteListing: (id) =>
    set((state) => ({
      listings: state.listings.filter((item) => item.id !== id),
    })),
}));

export default useListingStore;
