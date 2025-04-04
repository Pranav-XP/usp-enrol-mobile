import { Text, View } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { useSession } from "../../context/ctx";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/colors";

export default function TabLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#008C95",
        tabBarInactiveTintColor:Colors.darkTeal.DEFAULT,
        headerShown: false,
        animation: "none",
        tabBarStyle: {
          backgroundColor:Colors.teal[100],
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 60,
          position: "absolute",
          overflow: "hidden",
          borderWidth:1,
          borderColor:Colors.darkTeal[500],
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color,size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        />

      <Tabs.Screen
        name="my-program"
        options={{
          title: "My Programme",
          tabBarIcon: ({ color, size}) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="fees"
        options={{
          title: "Fees",
          tabBarIcon: ({ color,size }) => (
            <Ionicons name="card" size={size} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color,size}) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
        />
    </Tabs>
  );
}
