import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-0 w-full h-screen bg-white text-5xl font-semibold flex flex-col gap-2 items-center justify-center">
      <div className="w-30 h-30 border-t-4 rounded-full animate-spin"></div>
      <h2>Loading</h2>
    </div>
  );
};

export default Loading;
