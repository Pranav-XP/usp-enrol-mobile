import { getCourseDetails } from "@/api/api";
import CourseDetailsCard from "@/components/CourseDetailsCard";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CourseDetails() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseDetails", id],
    queryFn: () => getCourseDetails(session, id),
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
        <Text>Loading the course...</Text>
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
          An error occurred while fetching your program data.
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
    >
      <CourseDetailsCard course={data.course} />
    </View>
  );
}
