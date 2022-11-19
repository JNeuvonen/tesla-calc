import { requestHeaders } from "../util";

type loginReqTypes = {
  email: string;
  password: string;
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

  const ret = await res.json();

  return ret;
};
