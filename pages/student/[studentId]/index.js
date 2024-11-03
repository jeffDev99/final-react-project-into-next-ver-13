import { useRouter } from "next/router";

export default function StudentDetails() {
  const { query } = useRouter();
  return <div>Student Details : {query.studentId}</div>;
}
