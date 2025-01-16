import { Spinner } from "@nextui-org/react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-black">
      <Spinner />
      <span className="text-3xl text-white ml-5">Loading....</span>
    </div>
  );
};

export default Loader;
