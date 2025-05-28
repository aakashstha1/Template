import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/pages/authPages/Login";
import Register from "@/pages/authPages/Register";
import VerifyEmail from "@/pages/authPages/VerifyEmail";
import AuthLayout from "@/layouts/AuthLayout";
import ForgotPassword from "@/pages/authPages/ForgotPassword";
import ResetPassword from "@/pages/authPages/ResetPassword";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
