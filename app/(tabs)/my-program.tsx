import { getProgram } from "@/api/services/student";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyProgram() {
  const { session } = useSession();

  if (!session) {
    return <Text>Error</Text>;
  }
  const insets = useSafeAreaInsets();
  const { data } = useQuery({
    queryKey: ["program"],
    queryFn: () => getProgram(session),
  });
  console.log(data);

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
      <Text variant="titleLarge" style={{ marginLeft: 20, marginTop: 10 }}>
        {data?.student.program.name}
      </Text>
    </View>
  );
}
