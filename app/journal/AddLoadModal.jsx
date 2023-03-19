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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Stack } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: { xs: "95%", sm: 350 },
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const AddBrokerModal = () => {
  // const { addLoadMutation } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange;
  const [dateRange2, setDateRange2] = useState([]);
  const [startDate2, endDate2] = dateRange2;
  const formik = useFormik({
    initialValues: {
      bol: "dsfasdas",
      payment: "3232",
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
      console.log("values:", values);
      // console.log(dateRange2);
      values.completed = false;
      values.originWindow.push(dateRange[0]);
      values.originWindow.push(dateRange[1]);
      values.destinationWindow.push(dateRange2[0]);
      values.destinationWindow.push(dateRange2[1]);

      // values.originType = typeSelectedOrigin.type;
      // values.destinationType = typeSelected.type;

      // addLoadMutation.mutate({ dataType: "load", dataInfo: values });
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
          <Stack justifyContent="center" alignItems={"center"}>
            <Typography variant="h2" color="primary">
              Add Load
            </Typography>
            <Divider sx={{ width: "100%" }} />
            <Typography variant="caption" color="primary">
              * denotes required field
            </Typography>
          </Stack>

          <TextField
            id="originName"
            label="Name"
            placeholder="ABD Distribution"
            helperText={
              formik.touched.originName && formik.errors.originName
                ? formik.errors.originName
                : null
            }
            size="small"
            required
            error={
              formik.touched.originName && formik.errors.originName
                ? true
                : null
            }
            value={formik.values.originName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />

          <TextField
            id="originAddress"
            label="Address"
            placeholder="123 Dropoff Lane"
            helperText={
              formik.touched.originAddress && formik.errors.originAddress
                ? formik.errors.originAddress
                : null
            }
            size="small"
            required
            error={
              formik.touched.originAddress && formik.errors.originAddress
                ? true
                : null
            }
            value={formik.values.originAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />

          <Stack direction={"row"} spacing={1.2}>
            <TextField
              id="originTrailer"
              label="Trailer Identification"
              placeholder="BWR12345"
              helperText={
                formik.touched.originTrailer && formik.errors.originTrailer
                  ? formik.errors.originTrailer
                  : null
              }
              size="small"
              error={
                formik.touched.originTrailer && formik.errors.originTrailer
                  ? true
                  : null
              }
              value={formik.values.originTrailer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              id="originMiles"
              label="Miles"
              placeholder="234"
              helperText={
                formik.touched.originMiles && formik.errors.originMiles
                  ? formik.errors.originMiles
                  : null
              }
              size="small"
              error={
                formik.touched.originMiles && formik.errors.originMiles
                  ? true
                  : null
              }
              value={formik.values.originMiles}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flexGrow: 1 }}
            />
            <FormControl width={"60%"} size="small">
              <InputLabel id="originType">Type</InputLabel>
              <Select
                name="originType"
                labelId="originType"
                id="originType"
                value={formik.values.originType}
                label="originType"
                onChange={formik.handleChange}
              >
                <MenuItem value={"Live"}>Live</MenuItem>
                <MenuItem value={"Drop and Hook"}>Drop and Hook</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <FormControl size="large">
            <InputLabel id="originWindow">dd</InputLabel>
            <DatePicker
              id="originWindow"
              required
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              wrapperClassName="datePicker"
              onChange={(update) => {
                setDateRange(update);
              }}
              // isClearable={true}
              width={300}
              placeholderText={"Click to enter pickup window"}
            />
          </FormControl>
          <TextField
            id="notes"
            label="Notes"
            placeholder="Very heavy, make sure they load correctly"
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
              Create Load
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
