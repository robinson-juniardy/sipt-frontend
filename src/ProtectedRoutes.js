import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hook/useAuth";

const ProtectedRoutes = (props) => {
  const { auth } = useAuth();

  console.log(auth);
  console.log(localStorage.getItem("users_id"));

  return auth !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
