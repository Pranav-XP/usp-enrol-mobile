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

  if (isLoading) {
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
        <Text>Loading grades...</Text>
      </View>
    );
  }

  if (isError) {
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
        <Text>Error loading grades. Please try again later.</Text>
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
      }}
      className="mx-2"
    >
      <Text className="ml-5 mt-2" variant="titleLarge">
        Grades
      </Text>
      {/* Render the grades list once data is loaded */}
      <GradeList grades={data?.grades} />
    </View>
  );
}
