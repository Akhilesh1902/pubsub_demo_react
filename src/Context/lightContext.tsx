import { createContext, useContext, useState } from 'react';
import * as THREE from 'three';

function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export type LightContext = {
  isLightActive: boolean;
  lightIntensity: number;
  lightColor: THREE.Color;
  setLightActive: (val: boolean) => void;
  setIntensity: (val: number) => void;
  setColor: (val: THREE.Color) => void;
};

const [useLightContext, CtxProvider] = createCtx<LightContext>();

type Props = {
  children: React.ReactNode;
};
const LightContextProvider = ({ children }: Props) => {
  const [isLightActive, setIsLightActive] = useState(false);

  const [lightIntensity, setLightIntensity] = useState(4);
  const [lightColor, setLightColor] = useState(new THREE.Color(0xff0000));

  function setLightActive(val: boolean) {
    setIsLightActive(val);
  }

  function setIntensity(val: number) {
    setLightIntensity(val);
  }

  function setColor(val: THREE.Color) {
    setLightColor(val);
  }

  return (
    <CtxProvider
      value={{
        isLightActive,
        lightIntensity,
        lightColor,
        setLightActive,
        setIntensity,
        setColor,
      }}>
      {children}
    </CtxProvider>
  );
};

export { LightContextProvider, useLightContext };
