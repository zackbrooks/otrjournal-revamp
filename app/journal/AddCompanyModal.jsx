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

const AddCompanyModal = () => {
  // const { addCompanyMutation } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      location: "",
      phoneNumber: "",
      email: "",
      rating: 1,
      routing: "",
      notes: "",
      userId: "63d48272c8ad1d722139ed3d",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address"),
      name: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      phoneNumber: Yup.string(),
      rating: Yup.number(),
      notes: Yup.string(),
      routing: Yup.string(),
      userId: Yup.string(),
    }),
    onSubmit: async (values) => {
      addCompanyMutation.mutate({ dataType: "company", dataInfo: values });
    },
  });
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        size="large"
      >
        Add Company
      </Button>

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
            Add Company
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

          {/* <TextField
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
          /> */}
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
};

export default AddCompanyModal;
