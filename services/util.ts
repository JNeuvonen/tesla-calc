export const getRequest = async (
  endpoint: string,
  urlSearchParams?: URLSearchParams | null
) => {
  try {
    console.log(endpoint);

    const res = await fetch(
      endpoint + urlSearchParams ? "?" + urlSearchParams : ""
    );

    return res;
  } catch (err) {
    return null;
  }
};

export const putRequest = (_endpoint: string) => {};

export const delRequest = (_endpoint: string) => {};

export const postRequest = async ({
  endpoint,
  payload,
}: {
  endpoint: string;
  payload?: Record<string | number, unknown>;
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

  try {
    const res = await fetch(
      BASE_URL + endpoint,

      {
        method: "POST",
        body: payload
          ? JSON.stringify({
              payload: payload,
            })
          : null,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const parsedRes = await res.json();
    return parsedRes;
  } catch (err) {
    return null;
  }
};

export const requestHeaders = {
  "Content-Type": "application/json",
};
