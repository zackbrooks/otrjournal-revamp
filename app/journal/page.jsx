"use client";
import { Stack } from "@mui/material";
import AddBrokerModal from "./AddBrokerModal";
import AddLoadModal from "./AddLoadModal";
import AddCompanyModal from "./AddCompanyModal";
import { getSession, useSession } from "next-auth/react";
export default function Home() {
  console.log(useSession());
  return (
    <Stack spacing={1} direction="row">
      <AddBrokerModal />
      <AddLoadModal />
      <AddCompanyModal />
    </Stack>
  );
}

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         premanent: false,
//       },
//     };
//   }
//   // authorize user return session
//   return {
//     props: { session },
//   };
// }
