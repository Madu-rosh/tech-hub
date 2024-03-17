// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  role: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwtToken")
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Update the token state when the app loads
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      const decodedUser = jwtDecode<User>(storedToken); // Decoding the token
      setUser(decodedUser);
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("jwtToken", newToken);
    const decodedUser = jwtDecode<User>(newToken);
    setUser(decodedUser);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
