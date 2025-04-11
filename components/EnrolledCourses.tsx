import { View } from "react-native";
import { Divider, List, Text, useTheme } from "react-native-paper";
import React from "react";
import { StudentCourse } from "@/api/interfaces";

const EnrolledCourses = ({ courses }: { courses: StudentCourse[] }) => {
  const enrolledCourses = courses.filter(
    (course) => course.pivot.status === "enrolled"
  );

  const theme = useTheme();

  return (
    <View>
      <List.Accordion
        title="Enrolled Courses"
        left={(props) => <List.Icon {...props} icon="timer-sand" />}
      >
        {enrolledCourses.length === 0 ? (
          <View style={{ padding: 16 }}>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              No enrolled courses
            </Text>
          </View>
        ) : (
          enrolledCourses.map((course) => (
            <View key={course.id}>
              <List.Item
                title={course.course_code}
                description={course.course_title}
              />
              <Divider />
            </View>
          ))
        )}
      </List.Accordion>
    </View>
  );
};

export default EnrolledCourses;
