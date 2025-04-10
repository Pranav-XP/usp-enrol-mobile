import { View, Text } from "react-native";
import { Divider, List } from "react-native-paper";
import React from "react";
import { StudentCourse } from "@/api/interfaces";

const EnrolledCourses = ({ courses }: { courses: StudentCourse[] }) => {
  return (
    <View>
      <List.Accordion
        title={`Enrolled Courses`}
        left={(props) => (
          <List.Icon
            {...props}
            icon={"timer-sand"} // Conditional icon based on grade
          />
        )}
      >
        {courses
          .filter((course) => course.pivot.status === "enrolled") // Filter enrolled courses
          .map((course) => (
            <View key={course.id}>
              <List.Item
                title={course.course_code}
                description={course.course_title}
              />
              <Divider></Divider>
            </View>
          ))}
      </List.Accordion>
    </View>
  );
};

export default EnrolledCourses;
