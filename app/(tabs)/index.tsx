import { useSession } from "@/context/ctx";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { user } = useSession();
  return (
    <View
      style={{
        flex: 1,

        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text className="ml-5 mt-2" variant="displayMedium">
        Welcome {user?.student?.first_name}
      </Text>
    </View>
  );
}
