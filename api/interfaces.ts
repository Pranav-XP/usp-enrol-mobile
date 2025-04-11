export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  student?: {
    id: number;
    user_id: number;
    student_id: string;
    first_name: string;
    last_name: string;
    dob: string;
    email: string;
    phone: string;
    program_id: number;
    enrollment_year: string;
    created_at: string;
    updated_at: string;
    program?: {
      id: number;
      program_code: string;
      name: string;
      description: string;
      duration: number;
      created_at: string;
      updated_at: string;
    };
  };
}

export interface Prerequisite {
  id: number;
  course_id: number;
  prerequisite_groups: string[];
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  course_code: string;
  course_title: string;
  year: number;
  description: string;
  cost: string;
  semester_1: number;
  semester_2: number;
  created_at: string;
  updated_at: string;
  prerequisites: Prerequisite[];
  status?:string;
}

export interface StudentCourse {
  id: number;
  course_code: string;
  course_title: string;
  year: number;
  description: string;
  cost: string; // Assuming it's a string but can be a number if needed
  semester_1: 0 | 1; // 0 or 1 for availability in semester 1
  semester_2: 0 | 1; // 0 or 1 for availability in semester 2
  created_at: string;
  updated_at: string;
  pivot: CoursePivot; // The pivot information for the course
}

// Define Pivot interface
export interface CoursePivot {
  student_id: number;
  course_id: number;
  grade: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define CompletedCourse interface
export interface CompletedCourse {
  course_id: number;
  course_code: string;
  course_title: string;
  pivot: CoursePivot;
}

// Define CourseDetailsProps interface that includes completed_courses
export interface CourseDetailsProps {
  completed_courses: CompletedCourse[];
}

export interface Grade {
  course_id: number;
  course_code: string;
  course_name: string;
  gpa: string | null;
  status: 'completed' | 'enrolled';
  year: number;
  semester_1: number;
  semester_2: number;
}