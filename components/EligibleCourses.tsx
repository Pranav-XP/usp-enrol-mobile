import { View, Text, ScrollView } from "react-native";
import {
  Button,
  Checkbox,
  Divider,
  List,
  Portal,
  Snackbar,
  useTheme,
} from "react-native-paper";
import React, { useState } from "react";
import { StudentCourse } from "@/api/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollCourses } from "@/api/api";

const EligibleCourses = ({
  courses,
  session,
}: {
  courses: StudentCourse[];
  session: string;
}) => {
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    error: false,
  });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const mutation = useMutation({
    mutationFn: ({
      session,
      courseIds,
    }: {
      session: string;
      courseIds: number[];
    }) => enrollCourses(session, courseIds),
    onSuccess: (data) => {
      setSnackbar({
        visible: true,
        message: data.message,
        error: false,
      });
      setSelectedIds([]);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      setSnackbar({
        visible: true,
        message: error.response?.data?.message || "Enrollment failed",
        error: true,
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleEnroll = () => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    mutation.mutate({ session, courseIds: selectedIds });
  };

  return (
    <View>
      <List.Accordion
        title="Eligible Courses"
        left={(props) => <List.Icon {...props} icon="school" />}
      >
        <ScrollView style={{ maxHeight: 300 }}>
          {courses.map((course) => (
            <List.Item
              key={course.id}
              title={`${course.course_code}`}
              left={() => (
                <Checkbox.Android
                  status={
                    selectedIds.includes(course.id) ? "checked" : "unchecked"
                  }
                  onPress={() => toggleSelection(course.id)}
                />
              )}
            />
          ))}
        </ScrollView>
      </List.Accordion>

      <Button
        mode="contained"
        loading={loading}
        onPress={handleEnroll}
        disabled={selectedIds.length === 0}
        style={{ marginTop: 16 }}
      >
        Enroll in Selected
      </Button>
      <Portal>
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
          duration={3000}
          style={{
            backgroundColor: snackbar.error
              ? theme.colors.errorContainer
              : theme.colors.validContainer,
          }}
        >
          <Text
            style={{
              color: snackbar.error
                ? theme.colors.onErrorContainer
                : theme.colors.onValidContainer,
            }}
          >
            {snackbar.message}
          </Text>
        </Snackbar>
      </Portal>
    </View>
  );
};

export default EligibleCourses;
