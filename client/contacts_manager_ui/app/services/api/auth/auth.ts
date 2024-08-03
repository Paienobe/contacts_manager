import { LoginData } from "@/app/auth/login/types";
import { SignupData } from "@/app/auth/signup/types";
import { authInstance } from "@/app/axios/instances";
import { toast } from "react-toastify";

export const registerUser = async (data: SignupData) => {
  try {
    const request = await authInstance.post("/register/", data);
    return request.data;
  } catch (error) {
    authErrHandler(error).forEach((err) => {
      toast.warn(err);
    });
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const request = await authInstance.post("/login/", data);
    return request.data;
  } catch (error) {
    authErrHandler(error).forEach((err) => {
      toast.warn(err);
    });
  }
};

const authErrHandler = (error: any) => {
  const errorData = error.response.data;
  const errorKeys = Object.keys(errorData);
  const allErrors = errorKeys.map((key) => {
    const errorMessage = errorData[key];
    if (Array.isArray(errorMessage)) {
      return errorMessage[0];
    }
    return errorMessage;
  });
  return allErrors;
};
