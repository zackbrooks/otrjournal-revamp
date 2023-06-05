import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  alpha,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
// import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { BorderColor } from "@mui/icons-material";

const CardContentNoPadding = styled(CardContent)(`
  padding:  1;
  &:last-child {
    padding-bottom: 0;
  }
`);

const CardNoPadding = styled(Card)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

const DataCard = (props) => {
  const { type, data, deleteData, updateData, openModal } = props;

  const load = (
    <CardNoPadding
      sx={{
        // maxWidth: 300,
        backgroundColor: alpha("#dadde1", 0.75),
        width: "250px",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
        border: "1px solid black",
      }}
    >
      <CardActionArea>
        <CardContentNoPadding>
          <Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Origin:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.originName}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Destination:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.destinationName}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Pickup:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.originWindow}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Dropoff:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.destinationWindow}
              </Typography>
            </Stack>
          </Stack>
        </CardContentNoPadding>
        <Divider />
      </CardActionArea>
      <CardActions>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            deleteData.mutate({
              dataType: "load",
              dataId: data._id,
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" color="primary">
          <EditIcon />
        </IconButton>
      </CardActions>
    </CardNoPadding>
  );
  const company = (
    <CardNoPadding
      sx={{
        // maxWidth: 300,
        backgroundColor: alpha("#dadde1", 0.75),
        width: "250px",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
        border: "1px solid black",
      }}
    >
      <CardActionArea
        onClick={() => {
          console.log("BBBBBBBBBOOOOOOOOOOM");
        }}
      >
        <CardContentNoPadding>
          <Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Name:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.name}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Phone Number:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.phoneNumber}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Email:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.email}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Rating:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.rating}
              </Typography>
            </Stack>
          </Stack>
        </CardContentNoPadding>
        <Divider />
      </CardActionArea>
      <CardActions>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            deleteData.mutate({
              dataType: "company",
              dataId: data._id,
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" color="primary">
          <EditIcon />
        </IconButton>
      </CardActions>
    </CardNoPadding>
  );
  const broker = (
    <CardNoPadding
      sx={{
        // maxWidth: 300,
        backgroundColor: alpha("#dadde1", 0.75),
        width: "250px",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
        border: "1px solid black",
      }}
    >
      <CardActionArea onClick={openModal}>
        <CardContentNoPadding>
          <Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Name:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.firstName + " " + data.lastName}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Phone Number:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.phoneNumber}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Email:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.email}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={600}
              >
                Rating:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                fontSize={"1rem"}
                fontWeight={550}
              >
                {data.rating}
              </Typography>
            </Stack>
          </Stack>
        </CardContentNoPadding>
        <Divider />
      </CardActionArea>
      <CardActions>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            deleteData.mutate({
              dataType: "broker",
              dataId: data._id,
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" color="primary">
          <EditIcon />
        </IconButton>
      </CardActions>
    </CardNoPadding>
  );
  return (
    <Box>
      {type === "load" ? load : null}
      {type === "company" ? company : null}
      {type === "broker" ? broker : null}
    </Box>
  );
};

export default DataCard;
