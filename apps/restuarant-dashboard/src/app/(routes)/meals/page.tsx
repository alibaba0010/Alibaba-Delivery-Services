import React from "react";
import Meals from "../../../components/Meals/Meals";

const Page = () => {
  return (
    <div className="md:w-[90%] xl:w-[75%] m-auto">
      <h1 className="text-4xl text-center pt-3">All Meals Available</h1>
      <Meals />
    </div>
  );
};

export default Page;
