"use client";
import { shades } from "@/theme";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  LoadingButton,
  Divider,
} from "@mui/material";
import { Stack } from "@mui/system";
import { registerUser, getAllData } from "./journal/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: { xs: "95%", sm: 350 },
  width: 350,
  backgroundColor: (theme) => theme.palette.neutral.light,
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      password2: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords don't match!"),
    }),
    onSubmit: async (values) => {
      console.log("values:", values);
      // registerUser(values);

      //   try {
      //     const response = await journalApi.post("/api/user/signup", {
      //       email: values.email,
      //       password: values.password,
      //     });
      //     toast.success("User created! You will now be taken to the login page.");
      //     setTimeout(() => {
      //       navigate("/login");
      //     }, 3000);
      //   } catch (error) {
      //     toast.error(error.response.data);
      //     return error.response.data;
      //   }
    },
  });
  return (
    <>
      <Typography
        color="secondary"
        sx={{
          "&:hover": { cursor: "pointer" },
          fontWeight: "800",
        }}
        onClick={handleOpen}
      >
        Sign Up
      </Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          sx={style}
          spacing={2}
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography variant="h2" color="initial">
            Sign Up
          </Typography>

          <TextField
            id="email"
            label="Email"
            placeholder="john@example.com"
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
            size="small"
            required
            error={formik.touched.email && formik.errors.email ? true : null}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
            id="password"
            label="Password"
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
            size="small"
            required
            type={"password"}
            error={
              formik.touched.password && formik.errors.password ? true : null
            }
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="password2"
            label="Confirm Password"
            helperText={
              formik.touched.password2 && formik.errors.password2
                ? formik.errors.password2
                : null
            }
            size="small"
            required
            type={"password"}
            error={
              formik.touched.password2 && formik.errors.password2 ? true : null
            }
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Stack direction={"row"} spacing={2.2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={formik.handleSubmit}
              type="submit"
            >
              Create Account
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              size="large"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}
