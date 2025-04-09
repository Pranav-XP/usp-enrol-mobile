import { useSession } from "@/context/ctx";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, signOut } = useSession();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text className="ml-5 mt-2" variant="displayMedium">
        Welcome {user?.student?.first_name}
      </Text>
      <View className="justify-center">
        <Button
          onPress={() => {
            signOut();
          }}
          mode="contained"
        >
          Logout
        </Button>
      </View>
    </View>
  );
}
