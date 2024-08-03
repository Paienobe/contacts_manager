import React from "react";

type InputProps = {
  type?: string;
  value: string;
  changeFunc: (value: any) => void;
  className?: string;
  placeHolder: string;
  required?: boolean;
};

const Input = ({
  type,
  value,
  changeFunc,
  className,
  placeHolder,
  required = false,
}: InputProps) => {
  return (
    <input
      className={`p-3 border border-gray-200 rounded-lg ${className}`}
      type={type ? type : "text"}
      value={value}
      onChange={changeFunc}
      placeholder={placeHolder}
      required={required}
    />
  );
};

export default Input;
