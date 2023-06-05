import axios from "axios";
// import { useAuthStore } from "../store/userStore";
// import { toast } from "react-toastify";

export const journalApi = axios.create({
  baseURL: "http://localhost:3000",
  //   withCredentials: true,
  responseType: "json",
  headers: {
    Accept: "application/json",
  },
});

export const registerUser = async (userInfo) => {
  console.log("userInfo:", userInfo);

  try {
    const response = await journalApi.post("/api/auth/signup", userInfo);
    // console.log("Log in successful", response);
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

export const getAllData = async (dataType) => {
  // console.log("dataType:", dataType);
  try {
    const response = await journalApi.get(`/api/${dataType}/all`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    // toast.error(error.response.data);
  }
};

export const addNewData = async (obj) => {
  const { dataType, dataInfo } = obj;
  console.log(dataType, dataInfo);
  try {
    const response = await journalApi.post(`/api/${dataType}/create`, dataInfo);
    // toast.success(`${dataType} successfully added`);
  } catch (error) {
    console.log("error mayne", error);
    // if (error.response.data.error) {
    //   for (error of error.response.data.error) {
    //     toast.error(error);
    //   }
    // } else {
    //   toast.error(error.response.data);
    // }
  }
};

export const editData = async (obj) => {
  console.log("This would be a update call");
  const { dataType, dataInfo, dataId } = obj;
  console.log("EEEDDDIIITTT", dataType, dataInfo);
  try {
    const response = await journalApi.post(
      `/api/${dataType}/${dataId}`,
      dataInfo
    );
    // toast.success(`${dataType} successfully updated`);
  } catch (error) {
    console.log(error);
    // console.log("error mayne on Edit", error.response.data);
    // if (error.response.data.error) {
    //   for (error of error.response.data.error) {
    //     toast.error(error);
    //   }
    // } else {
    //   console.log(error)
    //   // toast.error(error.response.data);
    // }
  }
};

export const deleteData = async (obj) => {
  const { dataType, dataId } = obj;
  return await journalApi.delete(`/api/${dataType}/${dataId}`);
};
