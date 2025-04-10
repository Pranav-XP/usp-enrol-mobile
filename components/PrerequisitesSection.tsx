import { CompletedCourse } from "@/api/interfaces";
import React from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";

interface PrerequisitesSectionProps {
  prerequisiteGroups: (string | string[])[];
  completedCourses: CompletedCourse[];
}

export default function PrerequisitesSection({
  prerequisiteGroups,
  completedCourses,
}: PrerequisitesSectionProps) {
  // Check if a prerequisite group is met
  const isGroupMet = (group: string | string[]) => {
    if (Array.isArray(group)) {
      // If any course in the OR group is completed, it's met
      return group.some((code) =>
        completedCourses.some((course) => course.course_code === code)
      );
    }
    // Check if the single course code is completed
    return completedCourses.some((course) => course.course_code === group);
  };

  return (
    <View style={{ marginTop: 16, marginHorizontal: 20 }}>
      <Text
        variant="titleSmall"
        style={{ marginBottom: 8, fontWeight: "bold" }}
      >
        Prerequisites
      </Text>

      {Array.isArray(prerequisiteGroups) && prerequisiteGroups.length > 0 ? (
        prerequisiteGroups.map((group, index) => {
          const met = isGroupMet(group);
          const title = Array.isArray(group) ? group.join(" or ") : group;

          return (
            <List.Item
              key={index}
              title={title}
              titleStyle={{ fontSize: 14 }}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={met ? "book-check" : "book-remove"}
                  color={met ? "#4CAF50" : "#FF5252"} // green or red
                />
              )}
            />
          );
        })
      ) : (
        <List.Item
          title="No course prerequisites required"
          left={(props) => (
            <List.Icon {...props} icon="check-circle-outline" color="#ccc" />
          )}
          titleStyle={{ fontSize: 14, color: "#888" }}
        />
      )}
    </View>
  );
}
