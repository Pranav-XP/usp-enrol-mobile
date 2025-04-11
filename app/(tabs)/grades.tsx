import { getGrades } from "@/api/api";
import GradeList from "@/components/GradesList";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Grades() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["grades"],
    queryFn: () => getGrades(session),
  });

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="ml-5 mr-2"
    >
      <Text className="ml-5 mt-2" variant="titleLarge">
        Grades
      </Text>
      <GradeList grades={data.grades}></GradeList>
    </View>
  );
}
