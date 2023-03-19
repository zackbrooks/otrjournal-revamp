"use client";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <>
        Welcome {session.user.email}
        <Button variant="text" color="primary" onClick={() => signOut()}>
          Sign Out
        </Button>
      </>
    );
  } else {
    return <>You are not logged in.</>;
  }
}
