import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Product from "../components/Product";
import Profile from "../components/Profile";
import Login from "../components/Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import NotFound from "../components/NotFound";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<ProtectedRoute Component={Home} />} />
        <Route path="cart" element={<ProtectedRoute Component={Cart} />} />
        <Route
          path="profile"
          element={<ProtectedRoute Component={Profile} />}
        />
        <Route
          path="/product/:productId"
          element={<ProtectedRoute Component={ProductCard} />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
