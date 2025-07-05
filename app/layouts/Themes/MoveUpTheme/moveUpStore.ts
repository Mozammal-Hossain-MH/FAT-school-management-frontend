import { create } from "zustand";

interface MoveUpStore {
  isMoveUpNavbarOpen: boolean;
  setIsMoveUpNavbarOpen: (value: boolean) => void;
  // moveUpActiveMenu: any;
  // setMoveUpActiveMenu: (value: any) => void;
}

const useMoveUpStore = create<MoveUpStore>((set) => {
  return {
    isMoveUpNavbarOpen: true,
    setIsMoveUpNavbarOpen: (value: boolean) =>
      set({ isMoveUpNavbarOpen: value }),
    // moveUpActiveMenu: {},
    // setMoveUpActiveMenu: (value) => set({ moveUpActiveMenu: value })
  };
});

export default useMoveUpStore;
