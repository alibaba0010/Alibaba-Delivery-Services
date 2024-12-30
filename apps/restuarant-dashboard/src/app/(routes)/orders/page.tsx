import React from "react";
import Orders from "../../../components/Orders/Orders";

const Page = () => {
  return (
    <div className="md:w-[90%] xl:w-[75%] m-auto">
      <h1 className="text-4xl text-center pt-3">All Orders</h1>
      <Orders isDashboard={false} />
    </div>
  );
};

export default Page;
