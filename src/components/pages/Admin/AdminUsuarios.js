import React from "react";
import AdminMainPages from "../../wrappers/adminMainPages/AdminMainPages";
import DashboardAdmUsuarios from "./TemplatesAdmin/DashboardAdmUsuarios";

const AdminUsuarios = () => {
  return (
    <AdminMainPages option="usuario">
      <DashboardAdmUsuarios />
    </AdminMainPages>
  );
};

export default AdminUsuarios;
