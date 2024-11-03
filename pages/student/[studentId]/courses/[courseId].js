import { useRouter } from "next/router";

export default function StudentCourse() {
  const { query } = useRouter();
  console.log(query);

  return <div>Student  {query.studentId} Course : {query.courseId}</div>;
}
