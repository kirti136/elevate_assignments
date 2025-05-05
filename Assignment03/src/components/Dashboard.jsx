import React from "react";
import { LoginMessage } from "./LoginMessage";

const Dashboard = ({ isLoggedIn }) => {
  return <LoginMessage isLoggedIn={isLoggedIn} />;
};

export default Dashboard;
