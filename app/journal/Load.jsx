"use client";
import { Box, Stack, Typography, Divider, alpha } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { getAllData, editData, deleteData, addNewData } from "./utils";
import DataCard from "./DataCard";

const Load = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: loadInfo,
  } = useQuery("load", () => getAllData("load"));
  const addLoadMutation = useMutation(addNewData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("load");
    },
  });
  const updateLoadMutation = useMutation(editData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("load");
    },
  });
  const deleteLoadMutation = useMutation(deleteData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("load");
    },
  });
  const { data } = useSession();
  const userId = data?.user?.id;

  let content;
  if (isLoading) {
    content = <div>Data Loading</div>;
  } else if (isError) {
    content = <div>error.message</div>;
  } else {
    content = loadInfo;
  }
  return (
    <>
      {isLoading ? (
        <p>Data is loading</p>
      ) : Array.isArray(content) && content.length > 0 ? (
        content.map((load) => (
          <DataCard
            key={load._id}
            type="load"
            data={load}
            deleteData={deleteLoadMutation}
            updateData={updateLoadMutation}
          />
        ))
      ) : (
        <p>You havent entered any load data</p>
      )}
    </>
  );
};

export default Load;
