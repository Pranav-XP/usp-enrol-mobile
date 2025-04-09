import { getProgram } from "@/api/services/student";
import { Colors } from "@/constants/colors";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Text,
  List,
  Divider,
  ProgressBar,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Course = {
  id: number;
  course_code: string;
  course_title: string;
  year: number;
  status: string;
};

export default function MyProgram() {
  const { session } = useSession();
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const router = useRouter();

  const handleAccordionPress = (year: number) =>
    setExpandedYear((prev) => (prev === year ? null : year));

  const insets = useSafeAreaInsets();

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
        <Text>Loading your program...</Text>
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

  const courses: Course[] = data?.student.program.courses ?? [];

  const groupedByYear: Record<number, Course[]> = courses.reduce(
    (acc: Record<number, Course[]>, course: Course) => {
      if (!acc[course.year]) {
        acc[course.year] = [];
      }
      acc[course.year].push(course);
      return acc;
    },
    {}
  );

  const getIconByStatus = (status: string) => {
    switch (status) {
      case "enrolled":
        return { icon: "clock-outline", color: "yellow" }; // Yellow for enrolled
      case "completed":
        return { icon: "check-bold", color: "green" }; // Green for completed
      case "failed":
        return { icon: "alert-circle", color: "red" }; // Red for failed
      case "not_enrolled":
      default:
        return { icon: "close-circle-outline", color: "gray" }; // Default for not_enrolled
    }
  };

  // Calculate the number of completed courses and total courses
  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (course) => course.status === "completed"
  ).length;

  // Calculate progress (completed courses / total courses)
  const progress = totalCourses > 0 ? completedCourses / totalCourses : 0;

  return (
    <ScrollView
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

      <Text
        style={{
          marginLeft: 20,
          marginTop: 10,
          fontWeight: "bold",
        }}
        variant="labelLarge"
      >
        {progress * 100}% completed
      </Text>
      <ProgressBar
        progress={progress} // Adjust the color as needed
        style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}
      />

      <List.Section title="Courses Information">
        {Object.entries(groupedByYear).map(([year, yearCourses]) => (
          <List.Accordion
            key={year}
            title={`Year ${year}`}
            expanded={expandedYear === Number(year)}
            onPress={() => handleAccordionPress(Number(year))}
            left={(props) => <List.Icon {...props} icon="calendar" />}
          >
            {yearCourses.map((course) => (
              <View key={course.id}>
                <List.Item
                  onPress={() => router.navigate(`/course/${course.id}`)}
                  style={{ paddingVertical: 15 }}
                  titleStyle={{ fontWeight: "bold" }}
                  title={`${course.course_code}`}
                  description={course.course_title}
                  right={(props) => {
                    return (
                      <IconButton
                        {...props}
                        icon={"chevron-right"}
                        onPress={() => console.log("Pressed")}
                      />
                    );
                  }}
                  left={(props) => {
                    const { icon, color } = getIconByStatus(course.status); // Destructure the icon and color
                    return <List.Icon {...props} icon={icon} color={color} />;
                  }}
                />
                <Divider></Divider>
              </View>
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
}
