import { getProgram } from "@/api/api";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Portal, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EnrolledCourses from "@/components/EnrolledCourses";
import { Course, StudentCourse } from "@/api/interfaces";
import { Redirect, useRouter } from "expo-router";
import EligibleCourses from "@/components/EligibleCourses";

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

  const eligibleCourses: StudentCourse[] = Array.isArray(
    data.student.program.courses
  )
    ? data.student.program.courses.filter(
        (course: Course) => course.eligible === true
      )
    : [];

  return (
    <Portal.Host>
      <ScrollView
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
        <EligibleCourses
          courses={eligibleCourses}
          session={session}
        ></EligibleCourses>
      </ScrollView>
    </Portal.Host>
  );
}
