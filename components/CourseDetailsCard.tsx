import { Course } from "@/api/interfaces";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, IconButton } from "react-native-paper";

const CourseDetailsCard = ({ course }: { course: Course }) => {
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
        </Card.Content>
      </Card>
    </View>
  );
};

export default CourseDetailsCard;
