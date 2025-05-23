import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";
import { useStorageState } from "../hooks/useStorageState";
import * as Device from "expo-device";
import axios from "axios";
import { UserData } from "@/api/interfaces";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  user?: UserData | null;
}>({
  signIn: async () => {},
  signOut: () => {},
  session: null,
  isLoading: false,
  user: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserData | null>(null);
  const [[isLoading, session], setSession] = useStorageState("session");
  const device_name = Device.modelName;
  const queryClient = useQueryClient();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://intimate-buzzard-purely.ngrok-free.app/api/auth/login",
        {
          email,
          password,
          device_name,
        }
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      await setSession(response.data.token);
      setUser(response.data.user);
      queryClient.invalidateQueries();

      return response;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const signOut = async () => {
    try {
      await setSession(null); // Clear session storage
      queryClient.invalidateQueries();
      axios.defaults.headers.common["Authorization"] = ``; // Remove auth header
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
