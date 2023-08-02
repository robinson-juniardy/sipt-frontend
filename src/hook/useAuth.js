import { UsersContext } from "../context/UsersContext";
import React from "react";

export default function useAuth() {
  return React.useContext(UsersContext);
}
