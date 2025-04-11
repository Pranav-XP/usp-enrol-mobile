import { getGrades } from "@/api/api";
import GradeList from "@/components/GradesList";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
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
      <Text className="ml-5 mt-2 mb-2" variant="titleLarge">
        Grades
      </Text>
      <Card mode="elevated" style={{ marginBottom: 16, padding: 10 }}>
        <Card.Content style={{ alignItems: "center" }}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            Cumulative GPA
          </Text>
          <Text
            variant="headlineMedium"
            style={{ marginTop: 4, fontWeight: "bold" }}
          >
            {data.total_gpa?.toFixed(2)}
          </Text>
        </Card.Content>
      </Card>
      {/* Render the grades list once data is loaded */}
      <GradeList grades={data?.grades} />
    </View>
  );
}
