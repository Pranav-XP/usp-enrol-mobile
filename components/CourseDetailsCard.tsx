import { CompletedCourse, Course } from "@/api/interfaces";
import React from "react";
import { View } from "react-native";
import { Card, Text, IconButton, useTheme } from "react-native-paper";
import PrerequisitesSection from "./PrerequisitesSection";

interface CourseDetailsCardProps {
  course: Course; // This will be the main course data
  completed_courses: CompletedCourse[]; // This will be the list of completed courses
}

const CourseDetailsCard = ({
  course,
  completed_courses,
}: CourseDetailsCardProps) => {
  if (!course) {
    return <Text>Course data not available.</Text>;
  }

  const theme = useTheme();

  return (
    <View>
      <Card style={{ marginHorizontal: 10, marginTop: 10, padding: 0 }}>
        <Card.Cover
          source={{
            uri: "https://scontent.fsuv3-1.fna.fbcdn.net/v/t39.30808-6/452946980_1081673177292375_6611936189533136237_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=109&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=C7S3R9yntEEQ7kNvwEezx0O&_nc_oc=AdltVF8VoGc3gpLUgPvbgDmhsBdOP8ToPAUgXZpe0v8NaZMGcK0_2VPN_GhzKMuboR0&_nc_zt=23&_nc_ht=scontent.fsuv3-1.fna&_nc_gid=soXA5U_owTrWkg9K3XV5cA&oh=00_AfHlXdD2Za494ro3SW4RiZUkB1-s-Xg1MdKjfvV6RN-j1Q&oe=67FD2469",
          }}
        />
        <Card.Title
          titleVariant="titleLarge"
          titleNumberOfLines={3}
          title={course.course_title}
          titleStyle={{ fontWeight: "bold", marginTop: 5, marginBottom: 5 }}
          subtitleVariant="labelLarge"
          subtitle={course.course_code}
          subtitleStyle={{
            marginVertical: 5,
            fontWeight: "bold",
            color: theme.colors.onPrimaryContainer,
          }}
        />
        <Card.Content>
          <Text variant="bodyLarge">{course.description}</Text>

          {course.semester_1 === 1 ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="calendar-month" />
              <Text style={{ fontWeight: "bold" }}>
                Available in Semester 1
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="calendar-remove" />
              <Text style={{ fontWeight: "bold" }}>
                Unavailable in Semester 1
              </Text>
            </View>
          )}
          {course.semester_2 === 1 ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="calendar-month" />
              <Text style={{ fontWeight: "bold" }}>
                Available in Semester 2
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="calendar-remove" />
              <Text style={{ fontWeight: "bold" }}>
                Unavailable in Semester 2
              </Text>
            </View>
          )}
          {course.prerequisites && course.prerequisites.length > 0 ? (
            <PrerequisitesSection
              prerequisiteGroups={course.prerequisites[0].prerequisite_groups}
              completedCourses={completed_courses}
            />
          ) : (
            <PrerequisitesSection
              prerequisiteGroups={[]}
              completedCourses={completed_courses}
            />
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default CourseDetailsCard;
