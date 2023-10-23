import create from 'zustand';

interface BearState {
  isDay: boolean;
  updateDayLight: (url: boolean) => void;
}

const useAppStore = create<BearState>((set) => ({
  isDay: false,
  updateDayLight: (val: boolean) => set((state) => ({ ...state, isDay: val })),
}));

export default useAppStore;
