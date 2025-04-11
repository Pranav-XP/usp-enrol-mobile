import { Student } from "@/api/interfaces";
import React from "react";
import { View, ScrollView } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Divider,
  useTheme,
  Avatar,
} from "react-native-paper";

const StudentProfile = ({ student }: { student: Student }) => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: "center", padding: 20 }}
    >
      <Card
        style={{
          width: "100%",
          borderRadius: 12,
          paddingVertical: 20,
          backgroundColor: theme.colors.surface,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Avatar.Icon
            size={80}
            icon="account"
            style={{ backgroundColor: theme.colors.primary }}
          />
        </View>

        <Card.Content style={{ alignItems: "center", marginBottom: 10 }}>
          <Title>
            {student.first_name} {student.last_name}
          </Title>
          <Paragraph style={{ fontSize: 16, marginBottom: 4 }}>
            {student.student_id}
          </Paragraph>
          <Paragraph style={{ color: "gray" }}>{student.dob}</Paragraph>
        </Card.Content>

        <Divider style={{ marginVertical: 10 }} />

        <Card.Content>
          <Title style={{ fontSize: 18 }}>Contact Info</Title>
          <Paragraph>Email: {student.email}</Paragraph>
          <Paragraph>Phone: {student.phone}</Paragraph>
        </Card.Content>

        <Divider style={{ marginVertical: 10 }} />

        <Card.Content>
          <Title style={{ fontSize: 18 }}>Program Info</Title>
          <Paragraph>Code: {student.program.program_code}</Paragraph>
          <Paragraph>Name: {student.program.name}</Paragraph>
          <Paragraph>Description: {student.program.description}</Paragraph>
          <Paragraph>Duration: {student.program.duration} years</Paragraph>
        </Card.Content>

        <Divider style={{ marginVertical: 10 }} />

        <Card.Content>
          <Title style={{ fontSize: 18 }}>Enrollment</Title>
          <Paragraph>Year: {student.enrollment_year}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default StudentProfile;
