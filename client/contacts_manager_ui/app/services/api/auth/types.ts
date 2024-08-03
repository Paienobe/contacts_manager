export type SignupResponse = {
  user: User;
  msg: string;
  access_token: string;
  refresh_token: string;
};

export type LoginResponse = Omit<SignupResponse, "msg">;

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};
