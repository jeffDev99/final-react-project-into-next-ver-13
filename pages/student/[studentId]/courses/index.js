import { useRouter } from "next/router";

export default function StudentCourses() {
  const { query } = useRouter();
  return <div>Student: {query.studentId} Courses</div>;
}
