import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hook/useAuth";

const PublicRoutes = (props) => {
  const { auth } = useAuth();

  console.log(auth);

  return auth !== null ? <Navigate to={"/welcome"} /> : <Outlet />;
};

export default PublicRoutes;
