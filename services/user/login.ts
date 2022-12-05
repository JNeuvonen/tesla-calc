import { SignupProps } from "../../context/auth";
import { requestHeaders } from "../util";

type loginReqTypes = {
  email: string;
  password: string;
  role?: string;
  address?: string;
};

export const loginRequest = async ({ email, password }: loginReqTypes) => {
  const URL = process.env.NEXT_PUBLIC_BACKEND_HOST + "user/login";

  const res = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      payload: { email, password },
    }),
    headers: requestHeaders,
    credentials: "include",
  });

  return res;
};

export const signupRequest = async ({
  email,
  password,
  role,
  address,
  phoneNumber,
  lastName,
  firstName,
}: SignupProps) => {
  const URL = process.env.NEXT_PUBLIC_BACKEND_HOST + "user/signup";
  const res = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      payload: {
        email,
        password,
        role,
        address,
        phoneNumber,
        lastName,
        firstName,
      },
    }),
    headers: requestHeaders,
    credentials: "include",
  });

  return res;
};
