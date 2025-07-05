import { create } from "zustand";

type QuickSearchStore = {
  isQuickSearchOpen: boolean;
  setIsQuickSearchOpen: (value: boolean) => void;
};

const quickSearchStore = create<QuickSearchStore>((set) => ({
  isQuickSearchOpen: false,
  setIsQuickSearchOpen: (value: boolean) => {
    return set({ isQuickSearchOpen: value });
  },
}));

export default quickSearchStore;
