"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";

export default function Home() {
  const { data: session } = useSession();
  console.log("session:", session);

  if (session) {
    return (
      <>
        Login Welcome {session.user.email}
        <Button variant="text" color="primary" onClick={() => signOut()}>
          Sign Out
        </Button>
      </>
    );
  } else {
    return (
      <>
        You are not logged in.
        <Button variant="text" color="primary" onClick={() => signIn()}>
          Sign In
        </Button>
      </>
    );
  }
}
