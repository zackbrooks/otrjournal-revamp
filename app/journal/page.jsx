"use client";
import { Stack } from "@mui/material";
import AddBrokerModal from "./AddBrokerModal";
import AddLoadModal from "./AddLoadModal";
import AddCompanyModal from "./AddCompanyModal";
export default function Home() {
  return (
    <Stack spacing={1} direction="row">
      <AddBrokerModal />
      <AddLoadModal />
      <AddCompanyModal />
    </Stack>
  );
}
