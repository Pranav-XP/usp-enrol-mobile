import { Grade } from "@/api/interfaces";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import {
  Text,
  Card,
  Title,
  Paragraph,
  Chip,
  SegmentedButtons,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GradeList = ({ grades }: { grades: Grade[] }) => {
  const [filterType, setFilterType] = useState("semester");
  const [filterValue, setFilterValue] = useState<number | null>(1);
  const [filteredGrades, setFilteredGrades] = useState(grades);
  const [years, setYears] = useState<number[]>([]);
  const insets = useSafeAreaInsets();

  // Extract unique years
  useEffect(() => {
    const uniqueYears = Array.from(new Set(grades.map((grade) => grade.year)));
    setYears(uniqueYears);
  }, [grades]);

  // Apply filters
  useEffect(() => {
    const filtered = grades.filter((item) => {
      if (filterType === "semester" && filterValue !== null) {
        return item[`semester_${filterValue}`] === 1;
      } else if (filterType === "year" && filterValue !== null) {
        return item.year === filterValue;
      }
      return true;
    });
    setFilteredGrades(filtered);
  }, [filterType, filterValue, grades]);

  // Calculate average GPA
  const totalGpa =
    filteredGrades.reduce((sum, g) => sum + (g.gpa || 0), 0) /
    (filteredGrades.filter((g) => g.gpa !== null && g.gpa !== undefined)
      .length || 1);

  const renderItem = (item: Grade) => (
    <Card mode="elevated" style={{ marginBottom: 10 }} key={item.course_id}>
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title>{item.course_code}</Title>
        <Paragraph>{item.gpa ? `GPA: ${item.gpa}` : "GPA: N/A"}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Filter Selection */}
      <SegmentedButtons
        value={filterType}
        onValueChange={setFilterType}
        buttons={[
          { value: "semester", label: "By Semester" },
          { value: "year", label: "By Year" },
        ]}
        style={{ marginBottom: 10, marginTop: 5 }}
      />

      {/* Filter Options */}
      {filterType === "semester" ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 16,
            justifyContent: "space-between",
          }}
        >
          {[1, 2].map((sem) => (
            <Chip
              key={sem}
              style={{ flex: 1, marginHorizontal: 4 }}
              selected={filterValue === sem}
              onPress={() => setFilterValue(filterValue === sem ? null : sem)}
            >
              Semester {sem}
            </Chip>
          ))}
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 16,
            justifyContent: "space-between",
          }}
        >
          {years.map((year) => (
            <Chip
              style={{ flex: 1, marginHorizontal: 4 }}
              key={year}
              selected={filterValue === year}
              onPress={() => setFilterValue(filterValue === year ? null : year)}
            >
              Year {year}
            </Chip>
          ))}
        </View>
      )}

      {/* GPA Summary */}
      {filteredGrades.length > 0 && (
        <Card style={{ marginBottom: 10 }}>
          <Card.Content>
            <Title>Total GPA</Title>
            <Paragraph>{totalGpa.toFixed(2)}</Paragraph>
          </Card.Content>
        </Card>
      )}

      {/* Grade Cards */}
      {filteredGrades.length === 0 ? (
        <Text>No courses</Text>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
        >
          {filteredGrades.map((grade) => renderItem(grade))}
        </ScrollView>
      )}
    </View>
  );
};

export default GradeList;
