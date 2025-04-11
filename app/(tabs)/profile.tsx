import { getProfile } from "@/api/api";
import StudentProfile from "@/components/StudentProfile";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Text, Button, ActivityIndicator, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, signOut, session } = useSession();
  const theme = useTheme();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(session),
  });

  console.log(data);
  if (isLoading) {
    // Show loading indicator
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading the profile...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <Text
          style={{
            color: theme.colors.error,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Error loading data. Please try again.
        </Text>
        <Button
          onPress={() => {
            signOut();
          }}
          mode="contained"
        >
          Logout
        </Button>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        marginHorizontal: 5,
      }}
    >
      <Text variant="displaySmall">Student Profile</Text>
      <StudentProfile student={data.student} />
      <Button
        onPress={() => {
          signOut();
        }}
        mode="contained"
      >
        Logout
      </Button>
    </View>
  );
}
