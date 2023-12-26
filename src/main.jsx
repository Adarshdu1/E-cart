import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

const router = createBrowserRouter([{ path: "*", Component: AllRoutes }]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
