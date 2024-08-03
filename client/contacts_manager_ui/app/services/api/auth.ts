import { SignupData } from "@/app/auth/signup/page";
import { authInstance } from "@/app/axios/instances";

export const registerUser = async (data: SignupData) => {
  try {
    const request = await authInstance.post("/register/", data);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
