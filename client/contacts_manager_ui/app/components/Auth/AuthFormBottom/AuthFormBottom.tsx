import React from "react";
import { AuthFormBottomProps } from "./types";
import Link from "next/link";

const AuthFormBottom = ({
  question,
  route,
  link_text,
}: AuthFormBottomProps) => {
  return (
    <div className="mt-4">
      <p className="text-center text-gray-400">
        {question}?{" "}
        <Link
          href={route}
          className="text-purple-400 hover:text-purple-700 transition-colors duration-300"
        >
          {link_text}
        </Link>
      </p>
    </div>
  );
};

export default AuthFormBottom;
