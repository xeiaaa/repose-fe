import React from "react";
import { useOutletContext } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function Dashboard(props) {
  const context = useOutletContext();
  const { currentUser } = context;

  if (currentUser.role === "admin") {
    return <AdminDashboard currentUser={currentUser} />;
  } else {
    return <UserDashboard currentUser={currentUser} />;
  }
}

export default Dashboard;
