import { Text } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useSession } from '../../context/ctx';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppLayout() {
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
  return(
    <Tabs screenOptions={{ tabBarActiveTintColor: '#008C95',
      tabBarInactiveTintColor:'grey',
      headerShown:false,
     }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({color }) => <Ionicons name="home" size={24} color={color} /> ,
      }}
    />
    <Tabs.Screen
      name="my-program"
      options={{
        title: 'My Programme',
        tabBarIcon: ({ color }) => <Ionicons name="school" size={24} color={color} />,
      }}
    />

<Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
      }}
    />
  </Tabs>
  ) 
}
