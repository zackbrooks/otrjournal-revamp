"use client";
import { Box, Stack, Typography, Divider, alpha } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { getAllData, editData, deleteData, addNewData } from "./utils";
import DataCard from "./DataCard";

const Company = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: companyInfo,
  } = useQuery("company", () => getAllData("company"));
  const addCompanyMutation = useMutation(addNewData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("company");
    },
  });
  const updateCompanyMutation = useMutation(editData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("company");
    },
  });
  const deleteCompanyMutation = useMutation(deleteData, {
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries("company");
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
    content = companyInfo;
  }
  return (
    <>
      {isLoading ? (
        <p>Data is loading</p>
      ) : Array.isArray(content) && content.length > 0 ? (
        content.map(
          (company) => (
            <DataCard
              key={company._id}
              type="company"
              data={company}
              deleteData={deleteCompanyMutation}
              updateData={updateCompanyMutation}
            />
          )

          // <CompanyCard
          //   key={company._id}
          //   company={company}
          //   deleteCompanyMutation={deleteCompanyMutation}
          //   updateCompanyMutation={updateCompanyMutation}
          // />
        )
      ) : (
        <p>You havent entered any company data</p>
      )}
    </>
  );
};

export default Company;
