import React from "react";

type InputProps = {
  type?: string;
  value: string;
  changeFunc: (value: any) => void;
  className?: string;
  placeHolder: string;
};

const Input = ({
  type,
  value,
  changeFunc,
  className,
  placeHolder,
}: InputProps) => {
  return (
    <input
      className={`p-3 border border-gray-200 rounded-lg ${className}`}
      type={type ? type : "text"}
      value={value}
      onChange={changeFunc}
      placeholder={placeHolder}
    />
  );
};

export default Input;
