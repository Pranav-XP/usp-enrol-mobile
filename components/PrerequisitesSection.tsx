import { CompletedCourse } from "@/api/interfaces";
import React from "react";
import { View } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

interface PrerequisitesSectionProps {
  prerequisiteGroups: (string | string[])[];
  completedCourses: CompletedCourse[];
}

export default function PrerequisitesSection({
  prerequisiteGroups,
  completedCourses,
}: PrerequisitesSectionProps) {
  const theme = useTheme();
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
              titleStyle={{}}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={met ? "check-circle-outline" : "close-circle-outline"}
                  color={met ? theme.colors.valid : theme.colors.error} // green or red
                />
              )}
            />
          );
        })
      ) : (
        <List.Item
          title="No course prerequisites required"
          left={(props) => (
            <List.Icon
              {...props}
              icon="check-circle-outline"
              color={theme.colors.valid}
            />
          )}
          titleStyle={{
            fontSize: 14,
            color: theme.colors.onSecondaryContainer,
          }}
        />
      )}
    </View>
  );
}
