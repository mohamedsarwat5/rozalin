import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Checkout from "./components/CheckOut/CheckOut";
import { Toaster } from "sonner";
import StoreProvider from "./context/StoreProvider";
import BestSeller from "./components/BestSeller/BestSeller";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import NewArrivals from "./components/NewArrivals/NewArrivals";
import Exchange from "./components/Exchange/Exchange";
import Privacy from "./components/Privacy/Privacy";
import Contact from "./components/Contact/Contact";
import Shipping from "./components/Shipping/Shipping";

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
        { path: "bestSeller", element: <BestSeller /> },
        { path: "newarrival", element: <NewArrivals /> },
        { path: "exchange", element: <Exchange /> },
        { path: "privacy", element: <Privacy /> },
        { path: "contact", element: <Contact /> },
        { path: "shipping", element: <Shipping /> },
        { path: "category/:categoryName", element: <CategoryPage /> },
      ],
    },
  ]);

  return (
    <StoreProvider>
      <QueryClientProvider client={client}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              // width: "max-content", // يجعل العرض متناسباً مع طول النص تماماً
              display: "flex",
              justifyContent: "center",
            },
          }}
          richColors
        />
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StoreProvider>
  );
}
