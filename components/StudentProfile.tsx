import { Student } from "@/api/interfaces";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Title, Paragraph, Divider, useTheme } from "react-native-paper";

const StudentProfile = ({ student }: { student: Student }) => {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 20 }}>
        {/* Student Name Card */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Title>
              {student.first_name} {student.last_name}
            </Title>
            <Paragraph>{student.student_id}</Paragraph>
            <Paragraph>{student.dob}</Paragraph>
          </Card.Content>
        </Card>

        <Divider />

        {/* Student Contact Information */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Title>Contact Information</Title>
            <Paragraph>Email: {student.email}</Paragraph>
            <Paragraph>Phone: {student.phone}</Paragraph>
          </Card.Content>
        </Card>

        <Divider />

        {/* Program Information */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Title>Program Information</Title>
            <Paragraph>Program Code: {student.program.program_code}</Paragraph>
            <Paragraph>Program Name: {student.program.name}</Paragraph>
            <Paragraph>Description: {student.program.description}</Paragraph>
            <Paragraph>
              Program Duration: {student.program.duration} years
            </Paragraph>
          </Card.Content>
        </Card>

        <Divider />

        {/* Enrollment Information */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Title>Enrollment Information</Title>
            <Paragraph>Enrollment Year: {student.enrollment_year}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default StudentProfile;
