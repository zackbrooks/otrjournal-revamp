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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    // onSubmit: async (values) => {
    //   try {
    //     const response = await journalApi.post("/api/user/login", values);
    //     let token = await response.data.token;
    //     let user = response.data.id;
    //     console.log("TTTTTTTOKEN", token);

    //     setToken(token);
    //     toast.success(
    //       "Login successful! You will now be taken to your journal page."
    //     );
    //     setTimeout(() => {
    //       navigate("/broker");
    //     }, 3000);
    //   } catch (error) {
    //     toast.error(error.response.data);
    //     return error.response.data;
    //   }
    // },
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
        Log In
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
            Login
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
          <Stack direction={"row"} spacing={2.2}>
            <Button variant="contained" color="primary" size="large">
              Login
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
