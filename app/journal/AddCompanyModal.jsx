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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Stack } from "@mui/system";
import { addNewData } from "./utils";
import { useMutation, useQueryClient } from "react-query";

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
const AddCompanyModal = (props) => {
  const queryClient = useQueryClient();
  const addCompanyMutation = useMutation(addNewData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("company");
    },
  });
  const { userId } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "Shipper",
      location: "",
      phoneNumber: "",
      email: "",
      rating: 1,
      routing: "",
      notes: "",
      userId,
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
      console.log("values:", values);
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
          <Stack justifyContent="center" alignItems={"center"}>
            <Typography variant="h2" color="primary">
              Add Company
            </Typography>
            <Divider sx={{ width: "100%" }} />
            <Typography variant="caption" color="primary">
              * denotes required field
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={1}>
            <TextField
              id="name"
              label="Company Name"
              placeholder="ABD Distribution"
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
              size="small"
              required
              error={formik.touched.name && formik.errors.name ? true : null}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            <FormControl fullWidth size="small" required>
              <InputLabel id="type">Type</InputLabel>
              <Select
                name="type"
                labelId="type"
                id="type"
                value={formik.values.type}
                label="Type"
                onChange={formik.handleChange}
              >
                <MenuItem value={"Shipper"}>Shipper</MenuItem>
                <MenuItem value={"Receiver"}>Receiver</MenuItem>
                <MenuItem value={"Parking"}>Parking</MenuItem>
                <MenuItem value={"Repair/Service"}>Repair/Service</MenuItem>
                <MenuItem value={"Truck Stop"}>Truck Stop</MenuItem>
                <MenuItem value={"Truck Wash"}>Truck Wash</MenuItem>
                <MenuItem value={"Food/Restaurant"}>Food/Restaurant</MenuItem>
                <MenuItem value={"Hotel/Motel"}>Hotel/Motel</MenuItem>
                <MenuItem value={"Shopping"}>Shopping</MenuItem>
                <MenuItem value={"Pet Park"}>Pet Park</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Avoid"}>Avoid</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TextField
            id="location"
            label="Location"
            placeholder="123 Dropoff Lane"
            helperText={
              formik.touched.location && formik.errors.location
                ? formik.errors.location
                : null
            }
            size="small"
            required
            error={
              formik.touched.location && formik.errors.location ? true : null
            }
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />

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
            placeholder="This place allows you to come in 12hrs early"
            onChange={formik.handleChange}
            value={formik.values.notes}
            multiline
            fullWidth
          />
          <TextField
            id="routing"
            label="Routing Notes"
            placeholder="Come in from the north of the city."
            onChange={formik.handleChange}
            value={formik.values.routing}
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
              Create Company
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
