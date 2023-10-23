import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Color } from 'three';

interface BearState {
  isLightActive: boolean;
  lightIntensity: number;
  lightColor: THREE.Color;
  setLightActive: (val: boolean) => void;
  setIntensity: (val: number) => void;
  setColor: (val: THREE.Color) => void;
}

const useLightStore = create<BearState>((set) => ({
  isLightActive: false,
  setLightActive: (val: boolean) =>
    set((state) => ({ ...state, isLightActive: val })),
  lightIntensity: 1,
  setIntensity: (val: number) =>
    set((state) => ({ ...state, lightIntensity: val })),
  lightColor: new Color(0xff0000),
  setColor: (val: THREE.Color) =>
    set((state) => ({ ...state, lightColor: val })),
}));

export default useLightStore;
