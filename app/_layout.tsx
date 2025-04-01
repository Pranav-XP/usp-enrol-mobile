import { Stack } from "expo-router";
import "./globals.css";
import { SessionProvider } from "@/context/ctx";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <SafeAreaView className="bg-usp-dark-teal flex-1">
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </SessionProvider>
  );
}
