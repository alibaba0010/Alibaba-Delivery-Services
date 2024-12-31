"use client";
import React from "react";
import AddMeal from "../../../components/Meals/AddMeal";

const Page = () => {
  return (
    <div className="w-full">
      <h1 className="text-4xl text-center pt-5">Add a Meal</h1>
      <AddMeal />
    </div>
  );
};

export default Page;
