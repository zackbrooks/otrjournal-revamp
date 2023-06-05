"use client";
import {
  Box,
  Stack,
  Typography,
  Divider,
  alpha,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import AddBrokerModal from "./AddBrokerModal";
import AddLoadModal from "./AddLoadModal";
import AddCompanyModal from "./AddCompanyModal";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Broker from "./Broker";
import Company from "./Company";
import Load from "./Load";

export default function Home() {
  const { data } = useSession();
  const userId = data?.user?.id;
  const [value, setValue] = useState("company");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(userId);
  return (
    <Stack
      spacing={1}
      // display={"flex"}
      justifyContent="center"
      // flexDirection={"column"}
      alignItems={"center"}
      sx={{
        // backgroundColor: (theme) => theme.palette.neutral.light,
        backgroundColor: alpha("#dadde1", 0.75),
        width: { xs: "95%", sm: "800px", md: "900px" },
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h2" color="primary">
        Trucking Journal
      </Typography>
      <Divider sx={{ width: "80%" }} />
      <Box maxWidth={500}>
        <Typography variant="body1" color="primary" textAlign={"center"}>
          This is your digital trucking journal. This is where all your
          {/* <br /> */}
          information for things like brokers, loads and companies you come
          across
          {/* <br /> */}
          is stored. Click any of the buttons below to add another entry to your
          {/* <br /> */}
          journal or view any of the entries your currently have.
        </Typography>
      </Box>
      <Stack
        spacing={{ xs: 1, md: 1 }}
        direction={{ xs: "column", sm: "row" }}
        sx={{ width: { xs: "95%", md: "740px" } }}
        justifyContent="center"
      >
        <AddBrokerModal userId={userId} type={"blank"} />
        <AddLoadModal userId={userId} />
        <AddCompanyModal userId={userId} />
      </Stack>
      <Divider sx={{ width: "80%" }} />
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="Loads" value="load"></Tab>
        <Tab label="Companies" value="company"></Tab>
        <Tab label="Brokers" value="broker"></Tab>
      </Tabs>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        // columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        {value === "broker" ? <Broker /> : null}
        {value === "company" ? <Company /> : null}
        {value === "load" ? <Load /> : null}
      </Grid>
    </Stack>
  );
}
