import { createContext, useState } from "react";

export interface AuthContextData {
  accessToken?: string;
}

export interface AuthContextValue {
  authData: AuthContextData | null;
  setAuthData: (data: AuthContextData | null) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  authData: null,
  setAuthData: () => {}
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AuthContextData | null>(null);

  const contextValue = {
    authData: data,
    setAuthData: setData,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;