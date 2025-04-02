import { Stack } from "expo-router";
import "./globals.css";
import { SessionProvider } from "@/context/ctx";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-red-500">
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
