import React from "react";
import { TableRowProps } from "./types";
import { Pencil, Trash2 } from "lucide-react";
import { deleteContact } from "@/app/services/api/contacts/contacts";

const TableRow = ({ isLast, contact }: TableRowProps) => {
  return (
    <div
      className={`flex items-center border border-transparent ${
        isLast ? "" : "border-b-gray-300"
      }`}
    >
      <div className="w-[6%] p-2 h-full flex items-center gap-2">
        <Trash2
          className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
          onClick={() => {
            // deleteContact(contact.id);
          }}
        />
        <Pencil className="cursor-pointer hover:text-purple-500 transition-colors duration-300" />
      </div>
      <p className="w-[31%] border border-transparent border-l-gray-300 p-2 h-full">
        {contact.name}
      </p>
      <p className="w-[31%] border border-transparent border-l-gray-300 border-r-gray-300 p-2 h-full">
        {contact.phone_number}
      </p>
      <p className="w-[31%] p-2 h-full">{contact.email}</p>
    </div>
  );
};

export default TableRow;
