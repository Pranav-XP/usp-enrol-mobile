import { Stack } from "expo-router";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";

import { SessionProvider } from "@/context/ctx";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Colors } from "../constants/colors";
import { useColorScheme } from "react-native";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import merge from "deepmerge";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider value={paperTheme}>
            <SafeAreaProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </SafeAreaProvider>
          </ThemeProvider>
        </PaperProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
