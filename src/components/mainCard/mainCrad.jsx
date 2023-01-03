import React from "react";

const MainCard = ({ title, children }) => {
  return (
    <div className="flex justify-between flex-col  min-h-[248px] items-center bg-hamrah-blue rounded-md h-max shadow-xl p-6 border-[1px] border-neutral-400">
      <h2 className="my-4">{title}</h2>
      {children}
    </div>
  );
};

export default MainCard;
