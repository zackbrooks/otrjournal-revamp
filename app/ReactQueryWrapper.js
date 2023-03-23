"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactQueryDevtools from "react-query/devtools";

const queryClint = new QueryClient();

const ReactQueryWrapper = ({ children }) => (
  <QueryClientProvider client={queryClint}>
    {children}
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
);

export default ReactQueryWrapper;
