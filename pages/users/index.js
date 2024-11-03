import Link from "next/link";
import React from "react";
const users = [
  { id: 1, name: "amin" },
  { id: 2, name: "ali" },
  { id: 3, name: "hamed" },
];
export default function Users() {
  return (
    <div>
      Users
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
