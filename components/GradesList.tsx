import { Grade } from "@/api/interfaces";
import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Chip,
  SegmentedButtons,
} from "react-native-paper";

const GradeList = ({ grades }: { grades: Grade[] }) => {
  const [filterType, setFilterType] = useState("semester"); // Filter type: semester or year
  const [filterValue, setFilterValue] = useState(1); // Default to semester 1 or year 1
  const [filteredGrades, setFilteredGrades] = useState(grades);
  const [years, setYears] = useState<number[]>([]);

  // Extract unique years from the data
  useEffect(() => {
    const uniqueYears = Array.from(new Set(grades.map((grade) => grade.year)));
    setYears(uniqueYears);
  }, [grades]);

  // Apply the filter when the filter type or value changes
  useEffect(() => {
    const filtered = grades.filter((item) => {
      if (filterType === "semester") {
        return item[`semester_${filterValue}`] === 1;
      } else if (filterType === "year") {
        return item.year === filterValue;
      }
      return true;
    });
    setFilteredGrades(filtered);
  }, [filterType, filterValue, grades]);

  const renderItem = ({ item }: { item: Grade }) => (
    <Card mode="elevated">
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
    <View>
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
            onPress={() => setFilterValue(1)}
          >
            Semester 1
          </Chip>
          <Chip
            style={{ flex: 1, marginHorizontal: 4 }} // Equal space for each chip
            selected={filterValue === 2}
            onPress={() => setFilterValue(2)}
          >
            Semester 2
          </Chip>
        </View>
      ) : (
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
        >
          {years.map((year) => (
            <Chip
              key={year}
              selected={filterValue === year}
              onPress={() => setFilterValue(year)}
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
        <FlatList
          data={filteredGrades}
          renderItem={renderItem}
          keyExtractor={(item) => item.course_id.toString()}
          contentContainerStyle={{ paddingTop: 12 }}
        />
      )}
    </View>
  );
};

export default GradeList;
