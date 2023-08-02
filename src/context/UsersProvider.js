import React, { createContext } from "react";
import { UsersContext } from "./UsersContext";

export default function UsersProvider({ children }) {
  const [auth, setAuth] = React.useState(null);

  React.useEffect(() => {
    if (localStorage.getItem("users_id")) {
      setAuth({
        users_id: localStorage.getItem("users_id"),
        username: localStorage.getItem("username"),
        nama: localStorage.getItem("nama"),
        nip: localStorage.getItem("nip"),
        role: localStorage.getItem("role"),
        no_hp: localStorage.getItem("no_hp"),
        pangkat: localStorage.getItem("pangkat"),
        golongan: localStorage.getItem("golongan"),
        jabatan: localStorage.getItem("jabatan"),
      });
    } else {
      console.log("jalan");
      setAuth(null);
    }
  }, []);

  console.log(auth);

  return (
    <UsersContext.Provider value={{ auth, setAuth }}>
      {children}
    </UsersContext.Provider>
  );
}
