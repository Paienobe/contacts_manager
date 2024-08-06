import React from "react";

const TableHeader = () => {
  return (
    <div className="flex items-center border border-transparent border-b-gray-300">
      <p className="w-[6%] p-2 h-full"></p>
      <p className="w-[31%] border border-transparent border-l-gray-300 p-2 h-full">
        Contact Name
      </p>
      <p className="w-[31%] border border-transparent border-l-gray-300 border-r-gray-300 p-2 h-full">
        Phone number
      </p>
      <p className="w-[31%] p-2 h-full">Email</p>
    </div>
  );
};

export default TableHeader;
