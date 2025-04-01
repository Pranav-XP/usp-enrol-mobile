import { Stack } from "expo-router";
import "./globals.css"
import { SessionProvider } from "@/context/ctx";

export default function RootLayout() {

  return (
  <SessionProvider>
    <Stack
    screenOptions={{
      headerShown: false,
    }} />
  </SessionProvider>
  );
}
