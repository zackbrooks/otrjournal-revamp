"use client";
import Navbar from "./Navbar";
import { SessionProvider } from "next-auth/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <SessionProvider>
            <body
              style={{
                backgroundImage: `url(../images/hero.jpg)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center left -10rem",
                // background-attachment: fixed,
              }}
            >
              <header>
                <Navbar />
              </header>
              <main>{children}</main>
            </body>
          </SessionProvider>
        </CssBaseline>
      </ThemeProvider>
    </html>
  );
}
