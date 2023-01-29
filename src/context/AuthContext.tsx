import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider 
      value={{ isAuthenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
