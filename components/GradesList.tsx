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

const getLetterGrade = (gpa: number | null | undefined): string => {
  switch (gpa) {
    case 4.5:
      return "A+";
    case 4.0:
      return "A";
    case 3.5:
      return "B+";
    case 3.0:
      return "B";
    default:
      return "N/A";
  }
};

const GradeList = ({ grades }: { grades: Grade[] }) => {
  const [filterType, setFilterType] = useState("semester"); // Filter type: semester or year
  const [filterValue, setFilterValue] = useState<number | null>(1); // Default to semester 1 or year 1, null means no filter
  const [filteredGrades, setFilteredGrades] = useState(grades);
  const [years, setYears] = useState<number[]>([]);
  const insets = useSafeAreaInsets(); // Get safe area insets

  const getLetterGrade = (gpa: number | null | undefined): string => {
    if (gpa === 4.5) return "A+";
    if (gpa === 4.0) return "A";
    if (gpa === 3.5) return "B+";
    if (gpa === 3.0) return "B";
    return "N/A";
  };

  // Extract unique years from the data
  useEffect(() => {
    const uniqueYears = Array.from(new Set(grades.map((grade) => grade.year)));
    setYears(uniqueYears);
  }, [grades]);

  // Apply the filter when the filter type or value changes
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
        <Paragraph>
          Grade:{" "}
          {item.gpa !== null && item.gpa !== undefined
            ? getLetterGrade(Number(item.gpa))
            : "N/A"}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Filter Selection (By Semester or By Year) */}
      <SegmentedButtons
        value={filterType}
        onValueChange={setFilterType}
        buttons={[
          { value: "semester", label: "By Semester" },
          { value: "year", label: "By Year" },
        ]}
        style={{ marginBottom: 10, marginTop: 5 }}
      />

      {/* Filter Options for Semester or Year */}
      {filterType === "semester" ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 16,
            justifyContent: "space-between", // Evenly spaces the chips
          }}
        >
          <Chip
            style={{ flex: 1, marginHorizontal: 4 }} // Equal space for each chip
            selected={filterValue === 1}
            onPress={() => setFilterValue(filterValue === 1 ? null : 1)} // Deselect if already selected
          >
            Semester 1
          </Chip>
          <Chip
            style={{ flex: 1, marginHorizontal: 4 }} // Equal space for each chip
            selected={filterValue === 2}
            onPress={() => setFilterValue(filterValue === 2 ? null : 2)} // Deselect if already selected
          >
            Semester 2
          </Chip>
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
              onPress={() => setFilterValue(filterValue === year ? null : year)} // Deselect if already selected
            >
              Year {year}
            </Chip>
          ))}
        </View>
      )}

      {/* Check if filteredGrades has any data */}
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
