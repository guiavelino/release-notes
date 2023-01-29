import { createContext, MutableRefObject, ReactNode, useRef } from 'react';
import { useMediaQuery } from '@mui/material';

interface GlobalRefProps {
  toggleResponsiveMenu: () => void;
};

interface GlobalContextProps {
  isDesktop: boolean;
  globalRef: MutableRefObject<GlobalRefProps>
};

export const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  const isDesktop = useMediaQuery('(min-width: 960px)');
  const globalRef = useRef<GlobalRefProps>(null);

  return <GlobalContext.Provider value={{ isDesktop, globalRef }}>{children}</GlobalContext.Provider>;
}
