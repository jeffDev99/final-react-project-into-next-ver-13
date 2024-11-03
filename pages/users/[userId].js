import { useRouter } from "next/router";
export default function UserId() {
  const {query} = useRouter();
  return <div>UserId : {query.userId}</div>;
}
