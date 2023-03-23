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
} from "@mui/material";
import styled from "@emotion/styled";
// import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
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
  const { type, data, deleteData, updateData } = props;
  //   console.log("deleteData:", deleteData);
  //   console.log(data);
  const load = (
    <CardNoPadding
      sx={{
        maxWidth: 345,
        backgroundColor: alpha("#dadde1", 0.75),
        width: { xs: "95%", sm: "600px", md: "800px" },
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <CardActionArea
        onClick={() => {
          console.log("BBBBBBBBBOOOOOOOOOOM");
        }}
      >
        <CardContentNoPadding>
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {data.originName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.destinationName}
            </Typography>
          </Box>
        </CardContentNoPadding>
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
    <Typography variant="h1" color="initial">
      {data.name}
    </Typography>
  );
  const broker = (
    <CardNoPadding
      sx={{
        maxWidth: 300,
        backgroundColor: alpha("#dadde1", 0.75),
        width: { xs: "95%", sm: "600px", md: "800px" },
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
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
