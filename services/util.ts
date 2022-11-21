export const getRequest = async (endpoint: string) => {
  const res = await fetch(endpoint);
  return res;
};

export const putRequest = (_endpoint: string) => {};

export const delRequest = (_endpoint: string) => {};

export const postRequest = (_endpoint: string) => {};

export const requestHeaders = {
  "Content-Type": "application/json",
  credentials: "include",
};
