import { getGrades } from "@/api/api";
import GradeList from "@/components/GradesList";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Grades() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["grades"],
    queryFn: () => getGrades(session),
  });

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
        <Text>Loading your grades...</Text>
      </View>
    );
  }

  if (isError) {
    // Show error message
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text variant="bodyLarge" style={{ color: "red" }}>
          An error occurred while fetching your data.
        </Text>
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
