"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="./about">About</Link>
        </li>
        {!session ? (
          <>
            <li>
              <Link href="./Signin">Signin</Link>
            </li>
            <li>
              <Link href="./Signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="./Signout">Signout</Link>
            </li>
            <li>
              <Link href="./OrdersList">Orders List</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
