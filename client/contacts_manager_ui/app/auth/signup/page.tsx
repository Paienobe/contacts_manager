"use client";
import Input from "@/app/components/Input/Input";
import { preserveSession } from "@/app/lib/actions";
import { registerUser } from "@/app/services/api/auth/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SignupData } from "./types";
import { initialData } from "./constants";
import { toast } from "react-toastify";
import AuthFormBottom from "@/app/components/Auth/AuthFormBottom/AuthFormBottom";
import { useGlobalContext } from "@/app/context/global/GlobalContext";

const SignUpPage = () => {
  const router = useRouter();
  const { setUser } = useGlobalContext();
  const [data, setData] = useState(initialData);

  const updateData = (key: keyof SignupData, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleSignup = () => {
    registerUser(data).then((response) => {
      if (response) {
        preserveSession(response).then(() => {
          setUser(response.user);
          router.push("/");
          toast.success(`Welcome to CONTACTS ${data.first_name}`);
        });
      }
    });
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <form
        className="bg-white border border-gray-200 rounded-xl w-[45%] mx-auto p-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <h1 className="text-3xl text-center">REGISTER ON CONTACTS</h1>
        <section className="flex items-center flex-wrap mt-4 gap-4">
          <Input
            value={data.first_name}
            placeHolder="First name"
            className="basis-[calc(50%-0.5rem)]"
            changeFunc={(e) => updateData("first_name", e.target.value)}
            required
          />
          <Input
            value={data.last_name}
            placeHolder="Last name"
            className="basis-[calc(50%-0.5rem)]"
            changeFunc={(e) => updateData("last_name", e.target.value)}
            required
          />
          <Input
            value={data.email}
            placeHolder="Email address"
            type="email"
            className="w-[100%]"
            changeFunc={(e) => updateData("email", e.target.value)}
            required
          />
          <Input
            value={data.password}
            placeHolder="Enter password"
            type="password"
            className="basis-[calc(50%-0.5rem)]"
            changeFunc={(e) => updateData("password", e.target.value)}
            required
          />
          <Input
            value={data.password2}
            placeHolder="Confirm password"
            type="password"
            className="basis-[calc(50%-0.5rem)]"
            changeFunc={(e) => updateData("password2", e.target.value)}
            required
          />
          <button
            className="bg-purple-500 hover:bg-purple-700 transition-all duration-300 text-white w-full p-3 rounded-lg"
            type="submit"
          >
            Sign up
          </button>
        </section>
        <AuthFormBottom
          question="Arealdy have an account?"
          link_text="Log in"
          route="/auth/login"
        />
      </form>
    </main>
  );
};

export default SignUpPage;
