"use client";
import { NotebookTabs, Plus, Search } from "lucide-react";
import React, { useState } from "react";
import Input from "../Input/Input";

const Navbar = () => {
  const [query, setQuery] = useState("");
  return (
    <nav className="p-4 border border-b-gray-200 w-full h-fit flex items-center justify-between">
      <div className="flex items-center gap-2">
        <NotebookTabs />
        <p className="text-2xl">Contacts</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-4 border p-2 rounded-lg group hover:border-purple-500 transition-all duration-300">
          <p className="text-gray-400 group-hover:text-purple-500 transition-all duration-300">
            Add new contact
          </p>
          <div className="bg-purple-500 rounded-md w-[30px] h-[30px] grid place-content-center">
            <Plus className="text-white" />
          </div>
        </button>

        <div className="w-[500px] flex items-center justify-between p-2 rounded-lg gap-2 border border-gray-200 focus-within:border-purple-500">
          <Input
            value={query}
            placeHolder="Search contact"
            className="w-[calc(100%-0.5rem-30px)] h-[30px] border-transparent focus:outline-transparent"
            changeFunc={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button className="border border-gray-200 rounded-md w-[30px] h-[30px] grid place-content-center hover:border-purple-500">
            <Search />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
