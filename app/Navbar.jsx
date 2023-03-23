"use client";
import LoginModal from "@/components/LoginModal";
import SignupModal from "../components/SignupModal";
import SignupModal2 from "./SignupModal2";
import { getSession, useSession, signOut } from "next-auth/react";
import NextLink from "next/link";
import {
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
  Link as MuiLinkage,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/material";
import { shades } from "@/theme";

const Navbar = () => {
  const { data } = useSession();
  let loggedOut = (
    <Stack direction={"row"} spacing={5}>
      <MuiLinkage
        color="secondary"
        underline="none"
        href="/"
        component={NextLink}
        sx={{
          "&:hover": { cursor: "pointer" },
          fontWeight: "800",
        }}
      >
        Home
      </MuiLinkage>
      <MuiLinkage
        color="secondary"
        underline="none"
        href="/"
        component={NextLink}
        sx={{
          "&:hover": { cursor: "pointer" },
          fontWeight: "800",
        }}
      >
        F.A.Q
      </MuiLinkage>
      <MuiLinkage
        color="secondary"
        underline="none"
        sx={{
          "&:hover": { cursor: "pointer" },
          fontWeight: "800",
        }}
        href="/about"
        component={NextLink}
      >
        About Us
      </MuiLinkage>
      <LoginModal />
      <SignupModal2 />
    </Stack>
  );

  let loggedIn = (
    <Stack direction={"row"} spacing={5}>
      <MuiLinkage
        color="secondary"
        underline="none"
        href="/map"
        component={NextLink}
        sx={{
          "&:hover": { cursor: "pointer" },
          fontWeight: "800",
        }}
      >
        Map
      </MuiLinkage>
      <MuiLinkage
        color="secondary"
        underline="none"
        href="/journal"
        component={NextLink}
        sx={{
          "&:hover": { cursor: "pointer" },
          fontWeight: "800",
        }}
      >
        Journal
      </MuiLinkage>

      <MuiLinkage
        color="secondary"
        underline="none"
        sx={{
          "&:hover": { cursor: "pointer" },
          fontWeight: "800",
        }}
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </MuiLinkage>
    </Stack>
  );
  return (
    <Box marginBottom={20} flexGrow={1}>
      <AppBar color={"primary"}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body" color="white">
              OTF Journal
            </Typography>
          </Box>
          <Box alignItems="center">{data?.user ? loggedIn : loggedOut}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
