import { createContext, useState } from "react";

export interface AuthContextData {
  accessToken?: string;
}

export interface AuthContextValue {
  data: AuthContextData | null;
  setData: (data: AuthContextData | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AuthContextData | null>(null);

  const contextValue = {
    data,
    setData,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;