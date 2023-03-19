"use client";
import { shades } from "@/theme";
import { useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const AddBrokerModal = () => {
  // const { addLoadMutation } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      bol: "",
      payment: "",
      notes: "",
      completed: false,
      originName: "",
      originAddress: "",
      originTrailer: "",
      originWindow: [],
      originMiles: "",
      originType: "Live",
      destinationName: "",
      destinationAddress: "",
      destinationTrailer: "",
      destinationWindow: [],
      destinationMiles: "",
      destinationType: "Live",
      userId: "63d48272c8ad1d722139ed3d",
    },
    validationSchema: Yup.object({
      bol: Yup.string().required(),
      payment: Yup.string(),
      notes: Yup.string(),
      completed: Yup.boolean(),
      originName: Yup.string().required("Required"),
      originAddress: Yup.string().required("Required"),
      originTrailer: Yup.string().required("Required"),
      originWindow: Yup.array(),
      originMiles: Yup.string(),
      originType: Yup.string(),
      destinationName: Yup.string().required("Required"),
      destinationAddress: Yup.string().required("Required"),
      destinationTrailer: Yup.string().required("Required"),
      destinationWindow: Yup.array(),
      destinationMiles: Yup.string(),
      destinationType: Yup.string(),
      userId: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log(dateRange2);
      values.completed = false;
      values.originWindow.push(dateRange[0]);
      values.originWindow.push(dateRange[1]);
      values.destinationWindow.push(dateRange2[0]);
      values.destinationWindow.push(dateRange2[1]);
      console.log(typeSelectedOrigin?.type);

      values.originType = typeSelectedOrigin.type;
      values.destinationType = typeSelected.type;

      console.log("VALUES", values);
      addLoadMutation.mutate({ dataType: "load", dataInfo: values });
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
        Add Load
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
            Add Load
          </Typography>

          <TextField
            id="email"
            label="Email"
            placeholder="john@example.com"
            // helperText={
            //   formik.touched.email && formik.errors.email
            //     ? formik.errors.email
            //     : null
            // }
            // size="small"
            // required
            // error={formik.touched.email && formik.errors.email ? true : null}
            // value={formik.values.email}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
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

export default AddBrokerModal;
