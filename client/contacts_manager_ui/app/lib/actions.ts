"use server";
import { cookies } from "next/headers";
import { LoginResponse, SignupResponse } from "../services/api/types";

export const preserveSession = async (
  session_data: SignupResponse | LoginResponse
) => {
  cookies().set("contact_manager_user", JSON.stringify(session_data.user), {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 60 * 60 * 24 * 7, // one week,
    path: "/",
  });
  cookies().set("contact_manager_access_token", session_data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 60 * 60, // 60 minutes,
    path: "/",
  });
  cookies().set("contact_manager_refresh_token", session_data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week,
    path: "/",
  });
};

export const clearSession = async () => {
  cookies().set("contact_manager_user", "");
  cookies().set("contact_manager_access_token", "");
  cookies().set("contact_manager_refresh_token", "");
};

type TokenType =
  | "contact_manager_access_token"
  | "contact_manager_refresh_token";

export const getToken = async (token: TokenType) => {
  const myToken = cookies().get(token)?.value;
  return myToken ? myToken : null;
};
