import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Checkout from "./components/CheckOut/CheckOut";
import { Toaster } from "react-hot-toast";

export default function App() {
  const client = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "details/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={client}>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
