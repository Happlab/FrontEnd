import React from "react";
import DashboardAdmInicio from "./TemplatesAdmin/DashboardAdminInicio";
import AdminMainPages from "../../wrappers/adminMainPages/AdminMainPages";

const AdminInicio = () => {
  return (
    <AdminMainPages option="inicio">
      <DashboardAdmInicio />
    </AdminMainPages>
  );
};

export default AdminInicio;
