import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const clickHandler = () => {
    // router.push("/students")
    router.replace("/students")
  };
  return (
    <>
      <h2>jeff website</h2>
      <ul>
        <li>
          <Link href="/courses" replace>
            courses
          </Link>
        </li>
        <li>
          <Link href="/articles">articles</Link>
        </li>
        <li>
          <Link href="/users">users</Link>
        </li>
      </ul>
      <button onClick={clickHandler}>Log in</button>
    </>
  );
}
