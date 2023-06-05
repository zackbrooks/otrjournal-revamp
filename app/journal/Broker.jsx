"use client";
import { Box, Stack, Typography, Divider, alpha } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { getAllData, editData, deleteData, addNewData } from "./utils";
import DataCard from "./DataCard";
import BrokerFullModal from "./BrokerFullModal";

const Broker = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: brokerInfo,
  } = useQuery("broker", () => getAllData("broker"));
  const addBrokerMutation = useMutation(addNewData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("broker");
    },
  });
  const updateBrokerMutation = useMutation(editData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("broker");
    },
  });
  const deleteBrokerMutation = useMutation(deleteData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("broker");
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
    content = brokerInfo;
  }
  return (
    <>
      {isLoading ? (
        <p>Data is loading</p>
      ) : Array.isArray(content) && content.length > 0 ? (
        content.map((broker) => (
          <BrokerFullModal data={broker} userId={userId} key={broker._id} />
          // <DataCard
          //   key={broker._id}
          //   type="broker"
          //   data={broker}
          //   deleteData={deleteBrokerMutation}
          //   updateData={updateBrokerMutation}
          // />
        ))
      ) : (
        <p>You havent entered any broker data</p>
      )}
    </>
  );
};

export default Broker;
