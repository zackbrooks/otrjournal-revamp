"use client";
import { shades } from "@/theme";
import { useState } from "react";
import { useFormik } from "formik";
import { alpha } from "@mui/system";
import * as Yup from "yup";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  LoadingButton,
  Divider,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Stack } from "@mui/system";
import { addNewData } from "./utils";
import { useQuery, useMutation, useQueryClient } from "react-query";

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

const AddBrokerModal = (props) => {
  const queryClient = useQueryClient();
  const addBrokerMutation = useMutation(addNewData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("broker");
    },
  });
  const { userId, type, info } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      rating: 1,
      notes: "",
      userId,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      phoneNumber: Yup.string(),
      rating: Yup.number(),
      notes: Yup.string(),
      userId: Yup.string(),
    }),
    onSubmit: async (values) => {
      addBrokerMutation.mutate({ dataType: "broker", dataInfo: values });
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
        Add Broker
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
          <Stack justifyContent="center" alignItems={"center"}>
            <Typography variant="h2" color="primary">
              Add Broker
            </Typography>
            <Divider sx={{ width: "100%" }} />
            <Typography variant="caption" color="primary">
              * denotes required field
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={2}>
            <TextField
              id="firstName"
              label="First Name"
              placeholder="John"
              helperText={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : null
              }
              size="small"
              required
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? true
                  : null
              }
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              id="lastName"
              label="Last Name"
              placeholder="Doe"
              helperText={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : null
              }
              size="small"
              required
              error={
                formik.touched.lastName && formik.errors.lastName ? true : null
              }
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Stack>
          <Stack direction={"row"} spacing={1.2}>
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
              sx={{ flexGrow: 1 }}
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              placeholder="5012345566"
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? formik.errors.phoneNumber
                  : null
              }
              size="small"
              error={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? true
                  : null
              }
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormControl width={"60%"} size="small">
              <InputLabel id="rating">Rating</InputLabel>
              <Select
                name="rating"
                labelId="rating"
                id="rating"
                value={formik.values.rating}
                label="Rating"
                onChange={formik.handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField
            id="notes"
            label="Notes"
            placeholder="This broker offers fair rates."
            onChange={formik.handleChange}
            value={formik.values.notes}
            multiline
            fullWidth
          />
          <Divider sx={{ width: "100%" }} />

          <Stack direction={"row"} spacing={2.2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={formik.handleSubmit}
              type="submit"
            >
              Create Broker
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
