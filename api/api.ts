import instance from "./axiosInstance";


export const getProgram = async (session:string) => {
    const api = instance(session);
    const response = await api.get("/api/student/program");
    return response.data;
  };

  export const getCourseDetails = async (session:string,id:Number) => {
    const api = instance(session);
    const response = await api.get(`/api/courses/${id}`);
        return response.data;
  };

  export const getCourses = async (session:string) => {
    const api = instance(session);
    const response = await api.get(`/api/courses`);
        return response.data;
  };

  export const getCompletedCourses = async (session:string) => {
    const api = instance(session);
    const response = await api.get("/api/student/completed-courses");
    return response.data;
  };

  export const getGrades = async (session:string) => {
    const api = instance(session);
    const response = await api.get("/api/grades");
    return response.data;
  };

  export const getProfile = async (session:string) => {
    const api = instance(session);
    const response = await api.get("/api/student");
    return response.data;
  };

  // Enroll in courses
export const enrollCourses = async (session: string, courseIds: number[]) => {
  const api = instance(session);
  const response = await api.post("/api/enrol", {
    course_ids: courseIds,
  });
  return response.data;
};