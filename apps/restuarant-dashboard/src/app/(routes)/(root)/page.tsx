//Dashboard
import React from "react";
import DashboardData from "../../../components/Dashboard/DashboardData";
import DashboardOverview from "../../../components/Dashboard/DashboardOverview";
const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <DashboardData />
      <DashboardOverview />
    </div>
  );
};

export default Page;
