"use client";
import Input from "@/app/components/Input/Input";
import React, { useState } from "react";
import { initialData } from "./constants";
import { LoginData } from "./types";
import { loginUser } from "@/app/services/api/auth/auth";
import { preserveSession } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import AuthFormBottom from "@/app/components/Auth/AuthFormBottom/AuthFormBottom";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/app/context/global/GlobalContext";

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useGlobalContext();
  const [data, setData] = useState(initialData);
  const updateData = (key: keyof LoginData, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleLogin = () => {
    loginUser(data).then((response) => {
      if (response) {
        preserveSession(response).then(() => {
          setUser(response.user);
          router.push("/");
          toast.success("Logged In Successfully");
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
          handleLogin();
        }}
      >
        <h1 className="text-3xl text-center">LOGIN TO CONTACTS</h1>
        <section className="flex items-center flex-wrap mt-4 gap-4">
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
            className="w-[100%]"
            changeFunc={(e) => updateData("password", e.target.value)}
            required
          />
          <button
            className="bg-purple-500 hover:bg-purple-700 transition-all duration-300 text-white w-full p-3 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </section>
        <AuthFormBottom
          question="New to Contacts?"
          link_text="Create Account"
          route="/auth/signup"
        />
      </form>
    </main>
  );
};

export default LoginPage;
