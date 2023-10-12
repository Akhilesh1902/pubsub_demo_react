import { createContext, useContext, useState } from 'react';

function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export type AppContext = {
  isDay: boolean;

  updateDayLight: (url: boolean) => void;
};

const [useAppContext, CtxProvider] = createCtx<AppContext>();

type Props = {
  children: React.ReactNode;
};
const AppContextProvider = ({ children }: Props) => {
  const [isDay, setIsDay] = useState(false);

  function updateDayLight(val: boolean) {
    setIsDay(val);
  }
  return (
    <CtxProvider
      value={{
        isDay,
        updateDayLight,
      }}>
      {children}
    </CtxProvider>
  );
};

export { AppContextProvider, useAppContext };
