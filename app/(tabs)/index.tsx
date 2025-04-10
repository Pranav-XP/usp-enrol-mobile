import { getProgram } from "@/api/api";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EnrolledCourses from "@/components/EnrolledCourses";
import { Course, StudentCourse } from "@/api/interfaces";
import { Redirect, useRouter } from "expo-router";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { user, session } = useSession();
  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myProgram"],
    queryFn: () => getProgram(session),
  });

  // Show loading state for the query
  if (isLoading) {
    return <Text>Loading program...</Text>;
  }

  // Show error state for the query
  if (isError) {
    return <Text>Error loading program. Please try again.</Text>;
  }

  const studentCourses: StudentCourse[] = data.student.courses;

  const enrolledCourses: StudentCourse[] = Array.isArray(data.student.courses)
    ? data.student.courses.filter(
        (course: Course) => course.pivot?.status === "enrolled"
      )
    : [];

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="ml-5 mt-2"
    >
      <Text variant="displaySmall">Welcome {user?.student?.first_name}</Text>
      <EnrolledCourses courses={enrolledCourses}></EnrolledCourses>
    </View>
  );
}
