import { CompletedCourse, Course } from "@/api/interfaces";
import React from "react";
import { View } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
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

  return (
    <View>
      <Card style={{ marginHorizontal: 10, marginTop: 10, padding: 0 }}>
        <Card.Title
          titleVariant="titleLarge"
          titleNumberOfLines={3}
          title={course.course_title}
          subtitleVariant="labelLarge"
          subtitle={course.course_code}
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
