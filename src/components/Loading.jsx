import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-0 w-full h-screen bg-white md:text-5xl text-2xl font-semibold flex flex-col gap-2 items-center justify-center">
      <div className="md:w-30 md:h-30 h-10 w-10 border-t-4 rounded-full animate-spin"></div>
      <h2>Loading</h2>
    </div>
  );
};

export default Loading;
