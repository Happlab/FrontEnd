import React, { Component, useContext } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../../context/GlobalContext";
import Header from "../../pages/Admin/navegation/Header/Header";
import Sidebar from "../../pages/Admin/navegation/Sidebar/Sidebar";

const AdminMainPages = ({ option, children }) => {
  const { tokenUser, setTokenUser } = useContext(TokenContext);

  let data = tokenUser;
  // if (data === null) {
  //   return <Navigate to="/login" state={{ data }} />;
  // } else if ((data !== null) & (data.rol[0] !== "ADMIN")) {
  //   return <Navigate to="/" />;
  // }
  return (
    <div>
      <Header />
      <Sidebar option={option} />
      {children}
    </div>
  );
};

export default AdminMainPages;
