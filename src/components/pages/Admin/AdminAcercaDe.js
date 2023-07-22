import React from "react";
import DashboardAdmAcercaDe from "./TemplatesAdmin/DashboardAdminAcercaDe";
import AdminMainPages from "../../wrappers/adminMainPages/AdminMainPages";

const AdminAcercaDe = () => {
  return (
    <AdminMainPages option="acercaDe">
      <DashboardAdmAcercaDe />
    </AdminMainPages>
  );
};

export default AdminAcercaDe;
