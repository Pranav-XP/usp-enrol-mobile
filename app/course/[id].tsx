import { getCompletedCourses, getCourseDetails } from "@/api/api";
import CourseDetailsCard from "@/components/CourseDetailsCard";
import { useSession } from "@/context/ctx";
import { useQueries } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CourseDetails() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  if (!session) {
    // Replace `router.push` with your routing method
    router.push("/sign-in"); // Redirect to the login page
    return null; // Prevent further rendering of the page
  }
  const results = useQueries({
    queries: [
      {
        queryKey: ["courseDetails", id],
        queryFn: () => getCourseDetails(session, id),
      },
      {
        queryKey: ["completedCourses"],
        queryFn: () => getCompletedCourses(session),
      },
    ],
  });

  const isLoading = results.some((q) => q.isLoading);
  const isError = results.some((q) => q.isError);

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

  const courseData = results[0].data.course;
  const completedCourses = results[1].data.completed_courses;

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
      <CourseDetailsCard
        course={courseData}
        completed_courses={completedCourses}
      />
    </View>
  );
}
