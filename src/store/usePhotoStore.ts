import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PhotoStore {
  photos: string[];
  frameColor: string;
  selectedSticker: string | null;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  showDateTime: boolean;
  layout: number;
  selectedBackground: string | null;

  addPhoto: (photo: string) => void;
  resetPhotos: () => void;
  setFrameColor: (color: string) => void;
  toggleDateTime: () => void;
  setLayout: (layout: number) => void;

  setSelectedSticker: (sticker: string | null) => void;
  setSelectedBackground: (bg: string | null) => void;
}

export const usePhotoStore = create<PhotoStore>()(
  persist(
    (set) => ({
      photos: [],
      frameColor: "#ffffff",
      selectedSticker: null,
      selectedFilter: "",
      setSelectedFilter: (filter) => set({ selectedFilter: filter }),
      showDateTime: false,
      layout: 3,
      selectedBackground: null,

      addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
      resetPhotos: () => set({ photos: [], selectedSticker: null }),
      setFrameColor: (color) => set({ frameColor: color }),
      toggleDateTime: () => set((state) => ({ showDateTime: !state.showDateTime })),
      setLayout: (layout) => set({ layout }),

      setSelectedSticker: (sticker) => set({ selectedSticker: sticker }),
      setSelectedBackground: (bg) => set({ selectedBackground: bg }),
    }),
    {
      name: "photo-store",
      storage: {
        getItem: (key) => {
          const value = sessionStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          sessionStorage.removeItem(key);
        },
      },
    }
  )
);
