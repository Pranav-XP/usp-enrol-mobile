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